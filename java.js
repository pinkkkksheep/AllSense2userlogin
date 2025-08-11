//this opens a popup window//
document.getElementById("immerse-btn").addEventListener("click", function () {
  const screenWidth = window.screen.availWidth;
  const screenHeight = window.screen.availHeight;

  window.open(
    'popup.html',             
    '_blank',                    
    `width=${screenWidth},height=${screenHeight},top=0,left=0,resizable=no`
  );
});
