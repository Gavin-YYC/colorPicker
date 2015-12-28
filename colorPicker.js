;(function( window, undefined ){
	'use strict';
	
	var doc = window.document;
	
	function ColorPicker( value ){
		this.init( value );
	};

	ColorPicker.prototype = {
		constructor: ColorPicker,
		
		init: function( value ){
			var self = this;
			var nodes = this.find( "." + value );
			for ( var i = 0; i < nodes.length; i++ ) {
				nodes[i].style.position = "relative";
				nodes[i].onclick = function(){
					self.drawColor( this );
				}
			};
			
		},
		find: function( value ){
			return doc.querySelectorAll( value );
		},
		findOne: function( value ){
			return doc.querySelector( value );
		},
		setHtml: function( nodeType ){
			return doc.createElement( nodeType );
		},
		setPosition: function( des, colorDiv ){
			//设置点击位置
			var desX = des.offsetLeft,
				desY = des.offsetTop,
				desHeight = des.offsetHeight;
			colorDiv.style.top = desY + desHeight + "px";
			colorDiv.style.left = desX + "px";
		},

		drawColor: function( node ){
			var self = this;
			var colors = [ 'FF', 'CC', '99', '66', '33', '00' ];
			var len = colors.length;
			//创建容器
			var colorDiv = this.setHtml( "div" );
				colorDiv.id = "colorPicker";
			//设置容器位置
			this.setPosition( node, colorDiv );
			//创建table
			var table = this.setHtml( 'table' );
				colorDiv.appendChild( table );
			//创建tbody
			var tbody = this.setHtml( "tbody" );
				table.appendChild( tbody );
			//循环生成表格
			for ( var i = 0; i < len; i++ ) {
				var tr = this.setHtml( "tr" );
				tbody.appendChild( tr );			
				for ( var j = 0; j < len; j++ ) {
					if ( j == 3 ) {
						var tr = this.setHtml( "tr" );
						tbody.appendChild( tr );				
					};
					for ( var k = 0; k < len; k++ ) {
						var td = this.setHtml( "td" );
						td.style.backgroundColor = "#" + colors[i] + colors[j] + colors[k];
						td.setAttribute( "name", "#" + colors[i] + colors[j] + colors[k] );
						tr.appendChild( td );
					};
				};
			};
			//创建显示颜色区域
			var showDiv = this.setHtml( "div" );
				showDiv.setAttribute( "class", "previewcolor" );
				colorDiv.appendChild( showDiv );
			var color = this.setHtml( "div" );
				color.setAttribute( "class", "color" );
				showDiv.appendChild( color );
			var code = this.setHtml( "div" );
				code.setAttribute( "class", "code" );
				code.contentEditable = true;
				showDiv.appendChild( code );
			//所有内容创建到DOM中
			document.body.appendChild( colorDiv );

			//默认显示白色代码
			code.innerHTML = "#FFF";

			//鼠标经过颜色块，显示预览颜色，并提示颜色代码
			var targetColor;
			table.onmouseover = function( e ){
				var e = e || window.event;
				var target = e.target || e.srcElement;
				if ( target.nodeName == "TD" ) {
					targetColor = target.getAttribute("name");
					color.style.backgroundColor = targetColor;
					code.innerHTML = targetColor;
				}
			};
			//确定颜色
			table.onclick = function( e ){
				var e = e || window.event;
				var target = e.target || e.srcElement;
				//var targetColor;
				if( target.nodeName == "TD" ){
					node.value = targetColor;
					self.close( colorDiv );
					alert( targetColor );
				}
			};
		},
		close: function( colorDiv ){
			colorDiv.style.display = "none";
		}
	}

	window.ColorPicker = ColorPicker;

})( window )