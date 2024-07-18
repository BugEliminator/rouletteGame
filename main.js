// 캔버스 요소 선택 및 2D 렌더링 컨텍스트 가져오기
const $c = document.querySelector("canvas");
const ctx = $c.getContext('2d');

// 음식 항목과 색상 배열
let product = [];
const krFood = ["국밥", "냉면", "떡볶이", "라면", "짜장", "짬뽕", "탕수육", "짬짜면"];
const cnFood = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const jpFood = ["초밥", "우동", "돈가스", "규동"];
const usFood = ["피자", "파스타", "샐러드", "스테이크"];
const colors = ["#dc0936", "#e6471d", "#f7a416", "#efe61f", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"];

function setFoodCategory(category) {
  switch (category) {
    case 'kr':
      product = krFood;
      break;
    case 'cn':
      product = cnFood;
      break;
    case 'jp':
      product = jpFood;
      break;
    case 'us':
      product = usFood;
      break;
    case 'custom':
      product = prompt('항목을 ,로 구분하고 6 ~ 8개의 음식을 입력해 주세요:', '').split(',').map(item => item.trim());
      break;
    default:
      product = [];
  }
  newMake();
}

function newMake() {
  ctx.clearRect(0, 0, $c.width, $c.height);
  
  if (product.length === 0) return;
  
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = Math.PI / (product.length / 2);

  for (let i = 0; i < product.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * i, arc * (i + 1));
    ctx.fill();
    ctx.closePath();
  }

  ctx.fillStyle = "white";
  ctx.font = "18px Pretendard";
  ctx.textAlign = "center";

  for (let i = 0; i < product.length; i++) {
    const angle = (arc * i) + (arc / 2);

    ctx.save();
    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50),
    );
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(product[i], 0, 0);
    ctx.restore();
  }
}

 
function rotate() {
  if (product.length === 0) return;
  $c.style.transform = 'initial';
  $c.style.transition = 'initial';

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);
    const arc = 360 / product.length;
    const rotate = (ran * arc) + 3600 + (arc * 3) - (arc / 4);

    $c.style.transform = `rotate(-${rotate}deg)`;
    $c.style.transition = '2s';

    setTimeout(() => alert(`오늘의 식사는?! ${product[ran]} 어떠신가요?`), 2000);
  }, 1);
}
 
 // 회전판 생성 함수 호출
 setFoodCategory('kr');
 
 