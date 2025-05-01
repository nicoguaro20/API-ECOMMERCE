export function validateUser(user: any): boolean {
    if (!user) return false;
    
    return typeof user.name === 'string' && user.name.trim() !== '' &&
           typeof user.email === 'string' && user.email.includes('@') &&
           typeof user.password === 'string' && user.password.length >= 6 &&
           typeof user.address === 'string' && user.address.trim() !== '' &&
           typeof user.phone === 'number';
};

export function validateProduct(product: any): boolean {
    if (!product) return false;

    return typeof product.name === 'string' && product.name.trim() !== '' &&
           typeof product.description === 'string' && product.description.trim() !== '' &&
           typeof product.price === 'number' && product.price > 0 &&
           typeof product.stock === 'number' && product.stock >= 0 &&
           typeof product.imgUrl === 'string' && product.imgUrl.trim() !== '';
};