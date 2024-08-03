import { useParams } from 'react-router-dom';
import Checkout from './Checkout';

const products = [
    { id: 1, name: 'Bovine Collagen', price: 44.99, image: 'https://via.placeholder.com/150', description: "Premium Bovine Collagen Powder" },
    { id: 2, name: 'Marine Collagen', price: 44.99, image: 'https://via.placeholder.com/150', description: "Premium Marine Collagen Powder" },
];

function ProductDetails() {
    const { productId } = useParams<{ productId: string }>();
    const product = products.find(p => p.id === Number(productId));

    if (!product) {
        return <div className="bg-black min-h-screen text-white flex items-center justify-center">Product not found</div>;
    }

    return (
        <div className="bg-black min-h-screen p-6 text-white">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-black">
                <div>
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl mb-2">{'£' + product.price}</p>
                    <p className="text-gray-700 mb-10">{product.description}</p>
                </div>
                <Checkout price={product.price} />
            </div>
        </div>
    );
}

export default ProductDetails;
