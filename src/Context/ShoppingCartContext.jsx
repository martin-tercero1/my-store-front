import { createContext, useState, useEffect } from "react"

const ShoppingCartContext = createContext();

function ShoppingCartProvider({children}) {
 const [count, setCount] = useState(0);

 const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
 const openProductDetail = () => setIsProductDetailOpen(true);
 const closeProductDetail = () => setIsProductDetailOpen(false);

 const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
 const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
 const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  const [productToShow, setProductToShow] = useState({});

  const [cartProducts, setCartProducts] = useState([]);

  const [order, setOrder] = useState([]);


  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=15"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

    const [searchByTitle, setSearchByTitle] = useState("");
    const [searchByCategory, setSearchByCategory] = useState("");

  useEffect(() => {
    if (searchByTitle && !searchByCategory) setFilteredProducts(filterBy('BY TITLE', products, searchByTitle, searchByCategory));
    if (searchByCategory && !searchByTitle) setFilteredProducts(filterBy('BY_CATEGORY', products, searchByTitle, searchByCategory));
    if (searchByCategory && searchByTitle) setFilteredProducts(filterBy('BY_TITLE_AND_CATEGORY', products, searchByTitle, searchByCategory));
    if (!searchByCategory && !searchByTitle) setFilteredProducts(filterBy(null, products, searchByTitle, searchByCategory));
  }, [products, searchByTitle, searchByCategory]);


  const filterItemsByTitle = (products, searchByTitle) => {
    return products?.filter(product => product.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  };

  const filterItemsByCategory = (products, searchByCategory) => {
    return products?.filter((product) =>
      product.category.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, products, searchByTitle, searchByCategory) => {
    if(searchType === 'BY_TITLE') {
      return filterItemsByTitle(products, searchByTitle);
    }
    if (searchType === 'BY_CATEGORY') {
      console.log('cat')
      return filterItemsByCategory(products, searchByCategory);
    }
    if (searchType === "BY_TITLE_AND_CATEGORY") {
      console.log("cat and title");
      return filterItemsByCategory(products, searchByCategory).filter(product => product.title.toLowerCase().includes(searchByTitle.toLowerCase()));
    }
    console.log(searchType)
    if (!searchType ) {
      console.log('all prodcuts')
      console.log(products)
      return products;
    }
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        products,
        setProducts,
        searchByTitle,
        setSearchByTitle,
        filteredProducts,
        setFilteredProducts,
        searchByCategory,
        setSearchByCategory
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export {ShoppingCartProvider, ShoppingCartContext}