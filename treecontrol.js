function TreeNode(node)
{
	this.getNode = function() { return node; };
}

TreeNode.prototype.addNode = function(content)
{
	var container = $(".Container:first", this.getNode());

	if (container.length == 0)
		throw TypeError("Corrupt parentNode - have you been fiddling with the DOM?");

	var newNodeHtml = '<div class="TreeNode"><dt>' + content + '</dt><dl class="Container"></dl></div>';
	$(container).append(newNodeHtml);
	var newNode = $(".TreeNode:last", container);

	if ($("dt:first", this.getNode()).hasClass("Expand") == false)
		$("dt:first", this.getNode()).addClass("Expand").click(function()
		{
			var parent = $(this).parent();

			$(this).toggleClass("Expand Collaspe");

			if ($(this).hasClass("Collaspe"))
				$(".Container:first", parent).css("display", "none");
			else
				$(".Container:first", parent).css("display", "block");
		})

	return new TreeNode(newNode);
}

function TreeControl(div, content)
{
	if (!div.jquery)
		throw TypeError("Not a jQuery object");

	if (div.is("div") == false)
		throw TypeError("Not a div element");

	var newNodeHtml = '<div class="TreeNode"><dt>' + content + '</dt><dl class="Container"></dl></div>';
	div.append(newNodeHtml);

	return new TreeNode($(".TreeNode", div));
}