// Об'єкт для зберігання даних форми
let formData = {
  email: '',
  message: '',
};

// Отримання форми та елементів вводу
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');

// Завантаження даних з локального сховища
const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } catch (error) {
      console.error('Помилка при парсингу даних:', error);
    }
  }
};

// Збереження даних у локальне сховище
const saveToLocalStorage = () => {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

// Обробник введення даних
const handleInput = event => {
  const { name, value } = event.target;
  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    saveToLocalStorage();
  }
};

// Обробник відправки форми
const handleSubmit = event => {
  event.preventDefault();

  const currentEmail = formData.email.trim();
  const currentMessage = formData.message.trim();

  if (!currentEmail || !currentMessage) {
    alert('Fill please all fields');
    return;
  }

  console.log('Відправлені дані:', formData);
  localStorage.removeItem('feedback-form-state');
  formData = { email: '', message: '' };
  form.reset();
};

// Ініціалізація
loadFromLocalStorage();
form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);
