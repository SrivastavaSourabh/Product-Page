// ===== MODAL LOGIC =====
const openBtn = document.getElementById('openSizeChart');
const modal = document.getElementById('sizeChartModal');
const closeBtn = document.getElementById('closeModal');
const addToCart = document.getElementById('add-to-cart');
const buyNow = document.getElementById('buy-now');

// ===== SIZE & QUANTITY ELEMENTS =====
const priceElement = document.getElementById('price');
const qtyValue = document.getElementById('qtyValue');
const sizeElements = document.querySelectorAll('.size');

// ===== LOCALSTORAGE: Load saved data =====
const savedSize = localStorage.getItem('selectedSize');
const savedQty = localStorage.getItem('qty');

if (savedSize) {
  sizeElements.forEach(size => {
    if (size.textContent === savedSize) {
      size.classList.add('selected');
      const price = size.getAttribute('data-price');
      priceElement.textContent = `₹${price}`;
    }
  });
}

if (savedQty) {
  qtyValue.textContent = savedQty;
}

// ===== SIZE SELECT EVENT =====
sizeElements.forEach(size => {
  size.addEventListener('click', () => {
    sizeElements.forEach(s => s.classList.remove('selected'));
    size.classList.add('selected');

    const newPrice = size.getAttribute('data-price');
    priceElement.textContent = `₹${newPrice}`;
    localStorage.setItem('selectedSize', size.textContent);
  });
});

// ===== QUANTITY BUTTONS =====
document.getElementById('increaseQty').onclick = () => {
  qtyValue.textContent = parseInt(qtyValue.textContent) + 1;
  localStorage.setItem('qty', qtyValue.textContent);
};

document.getElementById('decreaseQty').onclick = () => {
  if (parseInt(qtyValue.textContent) > 1) {
    qtyValue.textContent = parseInt(qtyValue.textContent) - 1;
    localStorage.setItem('qty', qtyValue.textContent);
  }
};

// ===== MODAL BEHAVIOR =====
openBtn.onclick = () => {
  if (modal) modal.style.display = 'flex';
};

closeBtn.onclick = () => {
  if (modal) modal.style.display = 'none';
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (modal) modal.style.display = 'none';
    const colorModal = document.getElementById('colorCompareModal');
    if (colorModal) colorModal.style.display = 'none';
  }
});

// ===== ACTION BUTTONS =====
addToCart.onclick = () => showToast('Added to Cart');
buyNow.onclick = () => showToast('Buy Now');

// ===== TOAST FUNCTION =====
function showToast(message) {
  let toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ===== NEW: MAIN IMAGE SWITCHING =====
function updateMainImage(thumb) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = thumb.src;
  }
}

// ===== NEW: PRODUCT TABS =====
function showTab(id) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.querySelector(`[onclick="showTab('${id}')"]`).classList.add('active');
}

// ===== NEW: COLOR COMPARISON =====
let selectedColors = [];

document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.onclick = () => {
    const color = swatch.dataset.color;
    if (selectedColors.includes(color)) {
      selectedColors = selectedColors.filter(c => c !== color);
      swatch.classList.remove('active');
    } else {
      selectedColors.push(color);
      swatch.classList.add('active');
    }
  };
});

const compareBtn = document.getElementById('compareColors');
if (compareBtn) {
  compareBtn.onclick = () => {
    const container = document.getElementById('compareColorsContent');
    container.innerHTML = selectedColors.map(c =>
      `<div class="swatch-box ${c.toLowerCase()}">${c}</div>`
    ).join('');
    document.getElementById('colorCompareModal').style.display = 'flex';
  };
}

function closeCompareModal() {
  document.getElementById('colorCompareModal').style.display = 'none';
}
