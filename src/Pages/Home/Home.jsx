import { useContext } from "react"
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import Layout from "../../Components/Layout/Layout"
import Card from "../../Components/Card/Card"
import ProductDetail from "../../Components/ProductDetail/ProductDetail";

function Home() {  
  const context = useContext(ShoppingCartContext);
  const renderView = () => {
    if (context.filteredProducts?.length > 0) {
      return context.filteredProducts?.map((product) => (
        <Card key={product.id} data={product} />
      ));
    } else {
      return <p>No products match your search</p>;
    }
  }

  return (
    <Layout>
      <h1 className="font-medium text-xl">Exclusive Products</h1>
      <input
      onChange={(event) => {context.setSearchByTitle(event.target.value)}}
      type="text"
      placeholder="Search a product"
      className="w-80 p-4 border border-black rounded-lg mb-4 focus:outline-none"/>
      <div className="grid lg:grid-cols-4 grid-cols-2 w-full max-w-screen-lg gap-4">
        {renderView()}
      </div>
      <ProductDetail/>
    </Layout>
  );
}

export default Home