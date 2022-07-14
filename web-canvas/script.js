console.log("Hi")
const canvas = document.getElementById("canvas");


canvas.width = window.innerWidth-60;
canvas.height = 400;
let context = canvas.getContext("2d");
let ctx = canvas.getContext("2d");
// context.fillStyle = "white";
// context.fillRect(0,0,canvas.width,canvas.height);



setInterval( () => {
  let width = canvas.style.borderWidth.replace('px', '');
  canvas.style.borderWidth = (width % 4 + 1) + "px";
}, 500)

let draw_color = "black";
let draw_width = "20";
let is_drawing = false;
var type;
let text_on =false;

console.log("hey im here ");
canvas.addEventListener("touchstart", start)
canvas.addEventListener("touchmove", draw)


canvas.addEventListener("mousedown", start)
canvas.addEventListener("mousemove", draw)

canvas.addEventListener("touchend", stop)
canvas.addEventListener("mouseup", stop)


canvas.addEventListener("mouseout", stop)




var startx;
var starty;
let recindex = 0;
let circleindex = 0;
let triangleindex = 0;

function start(event) {
  
  is_drawing = true;
  if(type=="paste")  is_drawing==false;
  context.beginPath();
  context.moveTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
  );
  if(type=="rect"){
    restore();
    startx = event.clientX - canvas.offsetLeft;
    starty = event.clientY - canvas.offsetTop;
    recindex=0;
  }
  else if(type=="circle"){
    restore();
    startx = event.clientX - canvas.offsetLeft;
    starty = event.clientY - canvas.offsetTop;
    circleindex=0;
  }
  else if(type=="triangle"){
    restore();
    startx = event.clientX - canvas.offsetLeft;
    starty = event.clientY - canvas.offsetTop;
    triangleindex=0;
  }
  
  
  ctx.globalCompositeOperation = 'source-over';
  // console.log("deee")
  event.preventDefault();

}



function draw(event) {
  if(type=="triangle"){
    canvas.style.cursor = 'url("./src/triangle.png"), none';
  }else if(type=="pen"){
    canvas.style.cursor = 'url("./src/pen.png"), none';
  }else if(type=="eraser"){
    canvas.style.cursor = 'url("./src/eraser.png"), none';
  }else if(type=="circle"){
    canvas.style.cursor = 'url("./src/circle.png"), none';
  }else if(type=="rect"){
    canvas.style.cursor = 'url("./src/rec.png"), none';
  }
  else{
    canvas.style.cursor = "default";
  }
  if( is_drawing ){
      ctx.globalCompositeOperation = 'source-over';
      if(type=="pen"){
        // console.log("Hi111")
        ctx.globalCompositeOperation = 'source-over';
        context.lineTo(
          event.clientX - canvas.offsetLeft,
          event.clientY - canvas.offsetTop
        );
        // console.log("Hi222")
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

      }else if(type=="eraser"){
        ctx.globalCompositeOperation = 'destination-out';
        context.lineTo(
          event.clientX - canvas.offsetLeft,
          event.clientY - canvas.offsetTop
        );
        // console.log("Hi222")
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
      }else if(type=="rect"){
      
        ctx.fillStyle=draw_color;
        var x;
        var y;
        var w;
        var h;
        console.log(startx+","+starty);
        if(recindex==1) {console.log("recindex, before ",recindex);undo();recindex--;console.log("recindex, after ",recindex)}
        w =Math.abs(event.clientX - canvas.offsetLeft-startx);
        h =Math.abs(event.clientY - canvas.offsetTop-starty);
        x=Math.min(event.clientX,startx);
        y=Math.min(event.clientY,starty);
        
        ctx.fillRect(x,y,w,h);
        restored_array.push(context.getImageData(0,0,canvas.width,canvas.height));
        if(index==0)  {redo_array=[];index_redo=-1};
        index += 1;
        recindex+=1;
        
        
      }else if(type=="circle"){
        ctx.lineWidth = 1;
        ctx.fillStyle=draw_color;
        var x1 = event.clientX - canvas.offsetLeft;
        var y1 = event.clientY - canvas.offsetTop;
        
        a = (startx-x1)/2;
        b = (starty-y1)/2;

        var ra = Math.sqrt( a*a + b*b );
        
        if(circleindex==1) {console.log("remove circle ");undo();circleindex--;}
      
        ctx.fillStyle=draw_color;
        ctx.beginPath();
        ctx.arc(startx, starty, ra, 0, 2 * Math.PI, false);
        ctx.strokeStyle = draw_color;
        ctx.stroke();
        
        context.fill();
        
        // context.arc(startx, starty, ra, 0, 2 * Math.PI);
        // context.fill();
        //  ctx.fillRect(startx,starty,ra,ra);
        // ctx.stroke();

        restored_array.push(context.getImageData(0,0,canvas.width,canvas.height));
        if(index==0)  {redo_array=[];index_redo=-1};
        index += 1;
        circleindex+=1;
        ctx.lineWidth = draw_width;
        
        
      }else if(type=="triangle"){
        ctx.lineWidth = 1;
        ctx.fillStyle=draw_color;
        var x1 = event.clientX - canvas.offsetLeft;
        var y1 = event.clientY - canvas.offsetTop;
        
        a = (startx-x1)/2;
        b = (starty-y1)/2;

        var ra = Math.sqrt( a*a + b*b );
        
        if(triangleindex==1) {undo();triangleindex--;}
      
        ctx.strokeStyle=draw_color;
        
        ctx.fillStyle=draw_color;
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.lineTo(2 * startx - x1, y1);
        ctx.stroke();
        // ctx.moveTo(2 * startx - x1, y1);
        // ctx.lineTo(startx, starty);
        // ctx.stroke();
        
        context.fill();
        
        // context.arc(startx, starty, ra, 0, 2 * Math.PI);
        // context.fill();
        //  ctx.fillRect(startx,starty,ra,ra);
        // ctx.stroke();

        restored_array.push(context.getImageData(0,0,canvas.width,canvas.height));
        if(index==0)  {redo_array=[];index_redo=-1};
        index += 1;
        triangleindex+=1;
        ctx.lineWidth = draw_width;
        
      }
      
  }
  
  event.preventDefault();

}

let restored_array=[];
let index = -1;

let redo_array=[];
let index_redo = -1;
var text_temp = 0;
var paste_text = 0;
var temp_x;
var temp_y;
var past_cursor_image;

var fontchoose = document.getElementById("font_choose");


function stop(event){
 
  if(type=="paste"&&event.type!="mouseout"){

    console.log("hey im here to paste text");

    var x =  event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    ctx.fillStyle = draw_color;
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    
    console.log("ctx.font",ctx.font);
    console.log("dfffd"+myfont);
    if(paste_text) ctx.fillText(paste_text, x, y);
    else  alert("Nothing copied !!!");
    
    console.log("pirnt");
    restore();
  
  }else if(type=="text"&&event.type!= "mouseout"){
    
    if(text_temp!=0){
      var text = text_temp.value;
      var x = parseFloat(text_temp.style.top);
      var y = parseFloat(text_temp.style.left);
      document.body.removeChild(text_temp);
      ctx.fillStyle = draw_color;
      console.log("the text is "+text);
      var myfont = fontchoose.value;
      ctx.font = (draw_width*2).toString()+"px "+myfont;
      ctx.fillText(text, temp_x, temp_y);
      if(text)  paste_text = text;
      console.log("the text is on x: "+x);
      text_temp=0;
      restore();
       
    }   
    else if(event.type!= "mouseout"){
    
      console.log("hey im here to draw text");

      var x =  event.clientX - canvas.offsetLeft;
      var y = event.clientY - canvas.offsetTop;
      temp_x = x;
      temp_y = y;
      
      var text = document.createElement("INPUT");
      text.setAttribute("type","text");
      text.style.position="absolute";
      text.style.top=event.clientY+"px";
      text.style.left=event.clientX+"px";
      text.autofocus=true;
      document.body.appendChild(text);
      
      text_temp=text;
      
      
  

      console.log("sdasd,",text_temp);
    
    
    }
  
  }
  else if( is_drawing ){

    if(type=="rect"||type=="circle"||type=="triangle")  context.lineWidth = 1;
    context.fillStyle=draw_color;
    ctx.strokeStyle = draw_color;
    context.stroke();
    context.closePath();
    is_drawing = false;
    restore();
    context.lineWidth = draw_width;
  }
  if(event.type== "mouseout"){
    
    canvas.style.cursor = 'none';
  }
  event.preventDefault();
  
  

}
function restore(){
  if( event.type != "mouseout" ){
      restored_array.push(context.getImageData(0,0,canvas.width,canvas.height));
      if(index==0)  {redo_array=[];index_redo=-1};
      index += 1;
      if(recindex)  {undo();recindex=0;}
      if(circleindex)  {undo();circleindex=0;}
      if(triangleindex)  {undo();triangleindex=0;}

    }
}

function change_color(element){
  draw_color = element.style.background;
  fillStyle = draw_color;
  
  // type = "pen";
  console.log(type);
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
}

function rect_is_clicked(e){
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
  type="rect";
  canvas.style.cursor = 'url("./src/rec.png"), none';


}
function circle_is_clicked(e){
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
  type="circle";
  canvas.style.cursor = 'url("./src/circle.png"), none';


}
function triangle_is_clicked(e){
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    
     
  }
  type="triangle";
  canvas.style.cursor = 'url("./src/triangle.png"), none';
}

function pen_is_clicked(element){

  type = "pen";
  canvas.style.cursor = 'url("./src/pen.png"), none';
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
  
}

function color_picker_change(element){
  draw_color = element.value;

  // type = "pen";
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
  
}

function pen_range_change(element){
  draw_width = element.value;
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
}

function clear_all(){
  // context.fillStyle = "white";
  context.clearRect(0,0,canvas.width,canvas.height);
  // context.fillRect(0,0,canvas.width,canvas.height);
  
  restored_array=[];
  index = -1; 
  redo_array=[];
  index_redo = -1;
  text_temp=0;
  paste_text=0;
  alert("Clear all record !");
  console.log("this is clera "+ context.fillStyle);

}

function undo(){
  if(index>=0){
    
    if(recindex==0&&circleindex==0){
      index_redo = index_redo + 1;
      redo_array.unshift( restored_array[index] )
    }
    
    index = index - 1;
    restored_array.pop();
    if(index>=0)  context.putImageData(restored_array[index],0,0);
    else{
      // context.fillStyle = "white";
      context.clearRect(0,0,canvas.width,canvas.height);
      // context.fillRect(0,0,canvas.width,canvas.height);
    }
  }
  
  
}


function redo(){
  if(index_redo >= 0){
    
    context.putImageData(redo_array[0],0,0);
    restored_array.push(context.getImageData(0,0,canvas.width,canvas.height));
    index += 1;


    index_redo = index_redo - 1;
    redo_array.shift();
    
    

  }
  
  
}

function eraser_is_clicked(e){
  type = "eraser";
  canvas.style.cursor = 'url("./src/eraser.png"), none';
  console.log(type);
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
}

function text_is_clicked(e){
  type = "text";
  console.log(type);
}

function paste_is_clicked(e){
  
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.fillStyle = draw_color;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    paste_text = text;
    restore();
     
  }
  type = "paste";
  console.log(type);
}
function save_is_clicked(e){
  if(text_temp!=0){
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    var myfont = fontchoose.value;
    ctx.font = (draw_width*2).toString()+"px "+myfont;
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
  
  
  var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "my-image.png";
  link.href = image;
  link.click();
  alert("The image is saved!");

  
  
}



function handleImage(e){
  var reader = new FileReader();
  reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img,0,0);
      }
      img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);     
}

function fortext(e){
  if(text_temp!=0){
    console.log("heyyyyyyyyyyyy")
    var text = text_temp.value;
    var x = parseFloat(text_temp.style.top);
    var y = parseFloat(text_temp.style.left);
    document.body.removeChild(text_temp);
    ctx.fillStyle = draw_color;
    console.log("the text is "+text);
    ctx.font = (draw_width*2).toString()+"px serif";
    ctx.fillText(text, temp_x, temp_y);
    console.log("the text is on x: "+x);
    text_temp=0;
    restore();
     
  }
}


var fileUpload = document.getElementById('fileUpload');


function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.src = e.target.result;
           img.onload = function() {
             ctx.drawImage(img, 0,0,canvas.width,canvas.height);   
             restore();
            };
        };       
        FR.readAsDataURL( this.files[0] );
        
    }
}

fileUpload.onchange = readImage;


