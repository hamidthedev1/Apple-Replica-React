import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Four04 from "../For04/For04"

function ProductPage() {
  const [product, setProduct] = useState([]);
  // console.log(useParams());
  const { productID } = useParams();
  // console.log(productID);
  useEffect(() => {
    fetch("https://apple-replica-backend.onrender.com") //no semicolon
      .then((res) => res.json())
      .then((data) => {
        const productList = data.products;
        // console.log(productList);
        const singleProduct = productList.filter(
          (product) => product.product_url === productID
        );
        setProduct(singleProduct);
      })
      .catch(() => console.log("Error: Unable to fetch!!"));
  }, [productID])
  console.log(product);
  if (product.length) {
    return (
      <div>
        <section className='internal-page-wrapper'>
          <div className='container'>

            {product?.map((product) => {
              return (
                <div key={product.product_id}>
                  <div className="row justify-content-center text-center">
                    <div className="col-12 mt-5 pt-5">
                      <div className="title-wraper font-weight-bold">
                        {product.product_name}
                      </div>
                      <div className="brief-description">
                        {product.product_brief_description}
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center text-center product-holder h-100">
                    <div className={`col-sm-12 col-md-6 my-auto`}>
                      <div className="starting-price">
                        {`Starting at ${product.starting_price}`}
                      </div>
                      <div className="monthly-price">{product.price_range}</div>
                      <div className="product-details">{product.product_description}</div>
                    </div>

                    <div className={`col-sm-12 col-md-6`}>
                      <div className="product-image">
                        <img src={product.product_img} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          
          </div>
        </section>
      </div>
    )
  }
  else {
    return <Four04/>
  }
}

export default ProductPage