import { Link } from "react-router-dom";

const products = [
    { id: 1, name: 'Bovine Collagen', price: 44.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Marine Collagen', price: 44.99, image: 'https://via.placeholder.com/150' },
];

const convertToCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
}

function Products() {
    return (
        <div className='bg-black p-6'>
            <h1 className='text-white text-3xl mb-6'>Collagen Powders</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {products.map((product: {
                    id: number;
                    name: string;
                    price: number;
                    image: string;
                }) => (
                    <div key={product.id} className='bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer'>
                        <Link to={`/products/${product.id}`}>
                            <img src={product.image} alt={product.name} className='w-full h-48 object-cover' />
                            <div className='p-4'>
                                <h2 className='text-black text-lg font-semibold'>{product.name}</h2>
                                <p className='text-gray-700'>{convertToCurrency(product.price)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
