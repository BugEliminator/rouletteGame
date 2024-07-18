const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;

const krFood = ["국밥", "냉면", "떡볶이", "라면"];
const cnFood = ["짜장", "짬뽕", "탕수육", "짬짜면"];
const jpFood = ["초밥", "우동", "돈가스", "규동"];
const usFood = ["피자", "파스타", "샐러드", "스테이크"];
const colors = ["#dc0936", "#e6471d", "#f7a416", "#efe61f", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"];

function App() {
  const [product, setProduct] = useState(krFood);
  const canvasRef = useRef(null);

  const setFoodCategory = (category) => {
    switch (category) {
      case 'kr':
        setProduct(krFood);
        break;
      case 'cn':
        setProduct(cnFood);
        break;
      case 'jp':
        setProduct(jpFood);
        break;
      case 'us':
        setProduct(usFood);
        break;
      case 'custom':
        const customFood = prompt('항목을 ,로 구분하고 6 ~ 8개의 음식을 입력해 주세요:', '').split(',').map(item => item.trim());
        setProduct(customFood);
        break;
      default:
        setProduct([]);
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    if (product.length === 0) return;
    
    const [cw, ch] = [canvasRef.current.width / 2, canvasRef.current.height / 2];
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
  }, [product]);

  const rotate = () => {
    if (product.length === 0) return;
    const canvas = canvasRef.current;
    canvas.style.transform = 'initial';
    canvas.style.transition = 'initial';

    setTimeout(() => {
      const ran = Math.floor(Math.random() * product.length);
      const arc = 360 / product.length;
      const rotate = (ran * arc) + 3600 + (arc * 3) - (arc / 4);

      canvas.style.transform = `rotate(-${rotate}deg)`;
      canvas.style.transition = '2s';

      setTimeout(() => {
        alert(`오늘의 식사는?! ${product[ran]} 어떠신가요?`);
        confetti({
          particleCount: 150,
          spread: 60
        });
      }, 2000);
    }, 1);
  };

  return (
    <div>
      <div className="choiceFoodBtn">
        <a className="btn green rounded" onClick={() => setFoodCategory('kr')}>한식</a>
        <a className="btn blue rounded" onClick={() => setFoodCategory('cn')}>중식</a>
        <a className="btn red rounded" onClick={() => setFoodCategory('jp')}>일식</a>
        <a className="btn purple rounded" onClick={() => setFoodCategory('us')}>양식</a>
        <a className="btn cyan rounded" onClick={() => setFoodCategory('custom')}>내마음대로 넣기</a>
      </div>
      <div className="rouletteContainer">
        <div className="roulette">
          <div className="triangle"></div> 
          <canvas ref={canvasRef} width="380" height="380"></canvas>  
          <a className="btn yellow rounded start" onClick={rotate}>룰렛 돌리기</a>
          <div className="pointer"></div>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// 초기 회전판 생성
setFoodCategory('kr');
