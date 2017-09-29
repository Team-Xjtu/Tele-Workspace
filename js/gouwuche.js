/*计算总钱数*/
	function total(){
		setTimeout(function(){
			var S=0;
			$.each($('.total'), function() {
				var $ul_total=$(this).prev('ul').find("input[type='checkbox']");
				var s=0;
				var n1=0;
				$.each($(this).prev('ul').find(".number"), function(i) {
					if($ul_total.eq(i).attr("checked") !== undefined){
						s=s+parseInt($(this).html())*parseInt($(this).parent().prev().html().replace("￥",""));
						n1=n1+parseInt($(this).html());
					}
				});
				$(this).children("span").html("￥"+s.toFixed(1));
				$(this).children("number").html(n1);
				S=S+s;
			});
			$(".bottom span").html(S.toFixed(1));
		},100)
	}
	/*判断有无数据*/
	function hide(){
		if ($("#moban").length !== 0) {
			$(".bottom").eq(0).show();
			$(".no").css("display","-webkit-box");
			return;
		}else{
			//$(".total").hide();
			$(".bottom").eq(0).show();
			$(".no").css("display","none");
		}
	}
	/*判断是否全选*/
	function sum(){
		if ($("ul input[checked='checked']").length==$("li").length) {
			$(".bottom input[type=checkbox]").attr("checked","checked");
			$(".bottom input[type=checkbox]").next("img").attr("src","../image/c_checkbox_on.png");
		}else{
			$(".bottom input[type=checkbox]").removeAttr('checked');
			$(".bottom input[type=checkbox]").next("img").attr("src","../image/c_checkbox_off.png");
		}
	}
	/*给单选框或复选框添加样式*/
	//function checkbox($this){
	//	if($this.attr('type')=="checkbox"){
	//		   if ($this.attr('checked') == undefined || $this.attr('checked') == "checked") {
	//			   $this.removeAttr('checked');
	//			   $this.next('img').attr("src","../image/c_checkbox_off.png");
	//		   }else{
	//			   $this.attr("checked","checked");
	//			   $this.next('img').attr("src","../image/c_checkbox_on.png");
	//		   }
	//		}
	//		total();
	//}
		hide();
		total();
	/*底部全选*/
	$('.bottom-label input').change(function(){
		if ($(this).attr('checked') == undefined || $(this).attr('checked') !== "checked") {
			$(this).removeAttr('checked');
			$(this).next('img').attr("src","../image/c_checkbox_off.png");
			$('.checkboxList').removeAttr('checked');
			$('.checkboxList').next('img').attr("src","../image/c_checkbox_off.png");
		}else{
			$(this).attr("checked","checked");
			$(this).next('img').attr("src","../image/c_checkbox_on.png");
			$('.checkboxList').attr("checked","checked");
			$('.checkboxList').next('img').attr("src","../image/c_checkbox_on.png");
		}
		total();
	});
	/*单个*/
	$('.checkboxList').click(function(){
		if ($(this).attr('checked') == undefined || $(this).attr('checked') !== "checked") {
			$(this).removeAttr('checked');
			$(this).next('img').attr("src","../image/c_checkbox_off.png");
		}else{
			$(this).attr("checked","checked");
			$(this).next('img').attr("src","../image/c_checkbox_on.png");
		}
		sum();
		total();
	});
	/*子项全选*/
	//$('.list input').change(function(){
	//	var $list_input=$(this).parents('.list').next('ul').find('input[type=checkbox]');
	//	if ($list_input.attr('checked') == undefined || $list_input.attr('checked') !== "checked") {
	//		$list_input.attr("checked","checked");
	//		$list_input.next('img').attr("src","../image/c_checkbox_on.png");
	//	}else{
	//		$list_input.removeAttr('checked');
	//		$list_input.next('img').attr("src","../image/c_checkbox_off.png");
	//	}
	//	sum();
	//	checkbox($(this));
	//});
	/*点击加一*/
	$('.btn2').click(function(){
		$(this).prev('.number').html(parseInt($(this).prev('.number').html()) + 1);
		/*计算总钱数*/
		total();
	});
	/*点击减一*/
	$('.btn1').click(function(){
		if($(this).next('.number').html()==0)
			$(this).next('.number').html(0);
		else
			$(this).next('.number').html(parseInt($(this).next('.number').html()) - 1);
		/*计算总钱数*/
		total();
	});
	$(".number").click(function(){
		$('.text1').css({"display":"flex","-webkit-display":"flex"}).attr({'ind':$(this).parents('li').index(),"ind_1":$(this).parents("ul").attr("ind")});
		$('.text1 input[type=number]').val($(this).html());
	})
	$('.text1 input[type="button"]').click(function(){
		if($('.text1 input[type=number]').val()==""){
			$('.alert').show().html('请输入数量！');
			setTimeout(function(){$('.alert').hide();},2000);
			return false;
		}
		if ($('.text1 input[type=number]').val()>100) {
			$('.alert').show().html('超出库存了！');
			setTimeout(function(){$('.alert').hide();},2000);
			return false;
		}
		$("ul").eq($('.text1').attr('ind_1')).find(".number").eq($('.text1').attr('ind')).html($('.text1 input[type=number]').val());
		$('.text1').css({"display":"none","-webkit-display":"none"});
		total();
	})
	/*结算*/
	$('.sett').click(function(){
		$(".bottom").eq(1).show();
		hide();
	});
	$('.back').click(function(){
		$(".bottom").eq(1).hide();
		hide();
	});
	/*删除*/
	$('.delete').click(function(){
		var index = [];
		$.each($('li'), function(i) {
			if ($(this).find("input[type=checkbox]").attr("checked")=="checked") {
				index.push(resultDiybiaoshi[i]);
			}
		});
		$.get("http://47.95.209.24:3001/shanchudiy?diybiaoshi=" + index, function(result) {
			if(result == 1){
				for(var i = 0; i < index.length; i++){
					$("#" + index[i]).remove();
				}
				$(".total span").html("￥" + 0.0);
				$(".total number").html(0);
			}else{
				alert("删除失败");
			}
		});
		hide();
		total();
	});
	/*删除*/
