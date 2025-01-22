let cart = [];
let totalPrice = 0;
let products = [];
const users = {
    user1: "password1",
    user2: "password2"
};

// دالة لإنشاء حساب جديد
function createAccount() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // التحقق من تطابق كلمة المرور
    if (newPassword !== confirmPassword) {
        alert('كلمة المرور وتأكيد كلمة المرور غير متطابقتين');
        return false;
    }

    // التحقق من أن اسم المستخدم غير موجود مسبقًا
    if (users[newUsername]) {
        alert('اسم المستخدم موجود بالفعل. من فضلك اختر اسمًا آخر.');
        return false;
    }

    // إضافة الحساب الجديد إلى قائمة المستخدمين
    users[newUsername] = newPassword;

    // إظهار رسالة تأكيد وإنهاء نموذج إنشاء الحساب
    alert('تم إنشاء الحساب بنجاح!');
    document.getElementById('create-account').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    
    return false;
}

// دالة لتسجيل الدخول
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        document.getElementById('welcome-message').textContent = `مرحبًا، ${username}`;
        document.getElementById('logout-btn').style.display = 'inline-block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('search').style.display = 'block';
        document.getElementById('products').style.display = 'block';
        document.getElementById('cart').style.display = 'block';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
    return false;
}

// دالة لتسجيل الخروج
function logout() {
    document.getElementById('welcome-message').textContent = '';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('search').style.display = 'none';
    document.getElementById('products').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
}

// دالة لتغيير اللغة
function changeLanguage() {
    const selectedLanguage = document.getElementById('language-select').value;
    if (selectedLanguage === 'ar') {
        document.documentElement.lang = 'ar';
        document.getElementById('store-name').textContent = 'متجر ريان';
    } else {
        document.documentElement.lang = 'en';
        document.getElementById('store-name').textContent = 'RAYAN STORE';
    }
}

// دالة لإضافة منتج
function addProduct() {
    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const productImage = document.getElementById('product-image').files[0];

    const newProduct = {
        id: products.length + 1,
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage ? URL.createObjectURL(productImage) : 'default.jpg'
    };
    
    products.push(newProduct);
    displayProducts();
    document.getElementById('add-product-form').reset();
    return false;
}

// دالة لعرض المنتجات
function displayProducts() {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '<h2>المنتجات المتاحة</h2>';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.setAttribute('data-id', product.id);
        
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">${product.price}$</span>
            <img src="${product.image}" alt="${product.name}" width="100">
            <button onclick="addToCart(${product.id})">إضافة إلى السلة</button>
        `;

        productsSection.appendChild(productElement);
    });
}

// دالة لإضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    totalPrice += product.price;
    updateCart();
}

// دالة لتحديث السلة
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}$`;
        cartItemsElement.appendChild(li);
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// دالة لإفراغ السلة
function clearCart() {
    cart = [];
    totalPrice = 0;
    updateCart();
}

// دالة للبحث عن المنتجات
function searchProducts() {
    const searchQuery =
