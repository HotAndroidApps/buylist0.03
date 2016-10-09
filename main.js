$(function (){
    
    var LIST = $('.bl-list');
    var TEMP = $(".temp-row").html();
    
    var LIST_OF_REMAINS=$('.remains');
    var LIST_OF_BOUGHTS=$('.alreadyBought');
    
    
    var TEMP_REMAINS=$('.remains-temp').html();
    var TEMP_BOUGHTS=$('.alreadyBought-temp').html();
    
    var boughtORNot=true;

    
    addNewGoods("Помідори");
    addNewGoods("Сир");
    addNewGoods("Печиво");
    
    
    
    /* adding new thing*/
    $(".bl-add").click(function(){
       
        
        var log=$(".bl-textinput");
        var val= log.val();
 
        if(val){
           addNewGoods(val);
            }
        
        
    });
    
    
    
    function addNewGoods(val){
        
            var node=$(TEMP);  
        
            var nodeRemains=$(TEMP_REMAINS);
        
            var product =  $(node).find('.bl-product');
        
            var nodeBought=$(TEMP_BOUGHTS);
        
            $(node).find('.bl-product').text(val);  
            $(nodeRemains).find('.remain').text(val);
            $(nodeBought).find('.remain').text(val);
        
            $(node).addClass('state-bought');  
              
        
           product.bind("DOMSubtreeModified",function(){
            $(nodeRemains).text($(product).text());
        });
             

        $(node).find('.bl-plus').click(function(){buying(node,nodeRemains);})
        $(node).find('.bl-minus').click(function(){selling(node,nodeRemains);})
        
        $(node).find('.bl-exit').click( function(){removeThing(node,nodeRemains);} )
       
    
        $(node).find('.bl-boughtbut').click( function(){buyGoods(node,nodeRemains,nodeBought);} )
        
            LIST_OF_REMAINS.append(nodeRemains);
            LIST.append(node); 
        
        
    }
    
    
    
    
    
    /* buy another thing*/
   function buying(node,nodeRemains){
        
       var numRem=$(nodeRemains).find('.bl-numOfRemains');
       var valB=parseInt(numRem.text());
       
        var number = $(node).find('.bl-label');
        var value = parseInt(number.text());
        
        number.text(value+1);
        numRem.text(valB+1);
        
        }
   
    
    /* sell only one thing*/
    function selling(node,nodeRemains){
      
        var numRem=$(nodeRemains).find('.bl-numOfRemains');
        var valB=parseInt(numRem.text());
      
        
        var number=$(node).find('.bl-label');
        
        var value =parseInt(number.text());
        
         if(value-1!=0){
            number.text(value-1);
            numRem.text(valB-1);
         }
        
        
    }
       function buyGoods(node,nodeRemains,nodeBought) {
           
           if(!boughtORNot){
               $(node).find('.bl-product').addClass('textAligned');
               $(nodeBought).find('.remain').addClass('textAligned');
               boughtORNot=true;
               $(node).find('.bl-exit').hide();
               $(node).find('.bl-plus').hide();
               $(node).find('.bl-minus').hide();
               $(node).find('.bl-boughtbut').text("Не куплене");
               $(node).find('.bl-product').attr("contenteditable",false);
               var label = $(node).find('.bl-label');
               var number = parseInt(label.text());
               
                $(nodeBought).find('.number').text(number);
               
               nodeRemains.remove();
               LIST_OF_BOUGHTS.append(nodeBought);
               
           }else{
                $(node).find('.bl-product').removeClass('textAligned');
                boughtORNot=false;
                $(node).find('.bl-exit').show();
                $(node).find('.bl-plus').show();
                $(node).find('.bl-minus').show();
                $(node).find('.bl-boughtbut').text("Куплене");
                $(node).find('.bl-product').attr("contenteditable",true);
                var label = $(node).find('.bl-label');
                var number = parseInt(label.text());
               
                $(nodeRemains).find('.number').text(number);
               
               nodeBought.remove();
               LIST_OF_REMAINS.append(nodeRemains);
           }
           
        
}
    
    
    /*remove item*/
    function removeThing(node,nodeRemains){
        $(node).removeClass('.state-bought');
        node.remove();
        nodeRemains.remove();
    }
    
});