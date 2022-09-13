var BentoElement = document.getElementById("Bento");
var new_element = document.createElement('li');
new_element.className = 'badge-new';
new_element.textContent = '牛肉コロッケ';

// 指定した要素の中の末尾に挿入
BentoElement.appendChild(new_element);
