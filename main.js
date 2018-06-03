window.onload = () => {
	function g(x){
		switch(x.substr(0,1)){
			case '.':
				return document.getElementsByClassName(x.substr(1));
			case '#':
				return document.getElementById(x.substr(1));
			default:
				return document.getElementsByTagName(x);
		}
	}

	let shift = false;
	let profile = {
		'uname':'',
		'color':''
	};

	[...g('.completion')].forEach(v => {
		v.onmousedown = () => {	
			const value = parseInt(v.innerHTML);
			v.innerHTML = ((value + (shift ? 10 : 1)) % 99) + '/99';
		};
	});

	g('#newuse').onclick = () => {
		g('#login').style.zIndex = 1;
		g('#content').style.zIndex = 3;
	};

// Made with help from https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
	g('#reader').onchange = e => {
		const inp = e.target;
		const reader = new FileReader();
		reader.onload = () => {
			const text = reader.result;
			profile = JSON.parse(text) || {};
			update();
			g('#login').style.zIndex = 1;
			g('#content').style.zIndex = 3;
		}
		reader.readAsText(inp.files[0])
	};

	g('#signin').onclick = () => {
		g('#reader').click();
	}

	function update() {
		g('#set-uname').value = profile.uname;
		g('#set-color').value = profile.color;
		[...g('html')][0].style.setProperty('--shade',profile.color);
	}

	function dateup() {
		profile.uname = g('#set-uname').value;
		profile.color = g('#set-color').value;
	}

	g('#set-uname').onkeydown = e => {
		if(e.keyCode === 13){
			e.preventDefault();
			profile.uname = g('#set-uname').value;
			update();
		}
	}

	g('#set-color').onkeydown = e => {
		if(e.keyCode === 13){
			e.preventDefault();
			profile.color = g('#set-color').value;
			update();
		}
	};

	g('#set-savep').onclick = () => {
		dateup();
		const a = document.createElement('a');
		a.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile)));	
		a.setAttribute('download','profile.dasb4');
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	g('#set-logou').onclick = () => {
		g('#login').style.zIndex = 3;
		g('#content').style.zIndex = 1;
	}

	window.onkeydown = e => {
		if(e.keyCode === 16){shift = true;}
	};

	window.onkeyup = e => {
		if(e.keyCode === 16){shift = false;}
	}
};
