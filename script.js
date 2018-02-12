var height = window.innerHeight,
	width = window.innerWidth;

$(document).ready(function() {
	$('#loading').hide();
	init_scroll();	
})

var nouns;

var scroll_dist = 0;
var idx = 0;
var score = 0;
var score_e;

function init_scroll() {
	var scroll_el = $('#scrolling')
	var content = $('#scroll-content')

	lines = load_txt('assets/lines.txt')
	nouns = load_txt('assets/nounlist.txt')

		/*	
	for (var i=0; i < 1; i++) {
		add_text_el( content, lines[i], height*.3*(i+.5))
	}
	*/
	add_text_el( content, lines[idx], height*.3*(idx+.5))
	add_text_el( content, "",  height*.3*(idx+.5))
	idx+=1;
	init_score()
	scroll_el.scroll(function() {
		if (content.height() - height - scroll_el.scrollTop() < 1 ) {
			if (idx < lines.length) {
				add_text_el( content, lines[idx], height*.3*(idx+.5))
			} else {
				var noun = choose_random(nouns)
				add_text_el( content, 'scroll for '+ noun, height*.3*(idx+.5))
				score += 1;
				update_score(score.toString() + ' pts')
			}
			idx+=1;
		}
	})
}

function update_score( text ) {
	score_e.html(text)
}

function init_score() {
	score_e = $('<div id="score"></div>')
	score_e.addClass('inverted')
	score_e.css({
		position:'fixed',
		top:10,
		fontSize: 30,
		right:10
	})
	score_e.appendTo('body')
}

function load_txt(path) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', path, false);
	xhr.send(null);
	return xhr.responseText.split('\n');

}

function add_text_el( p, text,top_off) {
	var e = $('<div>')
	var inner_e = $('<div>')
	inner_e.appendTo(e)
	inner_e.html(text)
	e.addClass( 'positioned' )
	inner_e.addClass( 'inverted' )

	e.appendTo(p)
	e.css({
		top:top_off,
	})
	
}
