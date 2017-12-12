
 
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.getElementById('tools').clientHeight;
    //set canvas background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // save canvas image as data url (png format by default)
    let dataURL = canvas.toDataURL('image/jpeg');
    document.getElementById('canvasImg').src = dataURL;
    
    let hue = 0;
    let lineColor;
    let dragging = false;
    let radius = document.getElementById('radius').value;
    const size = document.getElementById('size');
    function radiusChange(value){
        radius = value;
        size.style.transform = `scale(${radius/100})`;
        size.style.backgroundColor = `${lineColor}`;
    }
    size.style.transform = `scale(${radius/100})`;

    

    let putpoint = function(e){
        if(dragging){
            ctx.lineWidth = radius*2;
            ctx.strokeStyle = lineColor ? lineColor : `hsl(${hue}, 50%, 40%)`;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, radius, 0,Math.PI*2);
            console.log(e.offsetX, e.offsetY, "e.offsetX, e.offsetY")
            ctx.fill();
            ctx.fillStyle = lineColor ? lineColor : `hsl(${hue}, 50%, 40%)`;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);

            hue++;
            if(hue > 360){
                hue = 0;
            }

            
            dataURL = canvas.toDataURL('image/jpeg');
            // set canvasImg image src to dataURL
            // so it can be saved as an image
            document.getElementById('canvasImg').src = dataURL;
            let button = document.querySelector('.download');
            button.href = dataURL.replace("image/jpeg", "image/octet-stream");
        }
    }

    let engage = function(e){
        dragging = true;
        putpoint(e);
    }

    let disengage = function(){
        dragging = false;
        ctx.beginPath();
    }

    canvas.addEventListener('mousedown', engage);
    canvas.addEventListener('mousemove', putpoint);
    canvas.addEventListener('mouseup', disengage);


    //color selection
    let myColor = document.getElementById('lineColor');
    myColor.addEventListener('change',function(e){
        lineColor = e.target.value;
        size.style.backgroundColor = `${lineColor}`;
    })

    //selected color
    let colors = ['red', 'yellow', 'green', 'blue', 'maroon', 'pink', 'black'];
    for(let i = 0; i < colors.length; i++){
        let colorWrap = document.getElementById('colors'),
            colorItem = document.createElement('span'),
            textNode = document.createTextNode(colors[i]);
        colorItem.style.background = colors[i];
        colorItem.className = "colorItem";
        colorWrap.appendChild(colorItem);
    }
    document.addEventListener('click',function(e){
        if(e.target && e.target.className === 'colorItem' || e.target.className.split(" ")[0] === 'colorItem'){
            lineColor = e.target.style.backgroundColor;
            size.style.backgroundColor = `${lineColor}`;
        }
    })
