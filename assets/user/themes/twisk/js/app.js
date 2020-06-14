document.addEventListener('DOMContentLoaded', function(event) {
	new Vue({
		el: 'body',
		ready: function() {
			window.addEventListener('scroll', this.watchMenu);
			window.addEventListener('scroll', this.headerTransition);
			window.addEventListener('resize', this.watchHeader);
			this.watchHeader();
			this.watchMenu();
			this.loadHeader();
		},
		computed: {
			fix: function() {
				var styles = window.getComputedStyle(document.documentElement, ''),
				pre = (Array.prototype.slice
					.call(styles)
					.join('')
					.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
					)[1];
				return {
					lowercase: pre,
					css: '-' + pre + '-',
					js: pre[0].toUpperCase() + pre.substr(1)
				}
			}
		},
		methods: {
			loadHeader: function() {
				var that = this;
				var url = this.$els.headerBackground.style.backgroundImage.replace('url(', '').replace(')', '').replace(/"/g, '');
				var img = new Image();
				img.src = url;
				img.onload = function() {
					that.$els.headerBackground.className = 'background show';
				}
			},
			watchMenu: function(e) {
				var html = document.getElementsByTagName('html');
				this.scrollTop = this.$el.scrollTop + html[0].scrollTop; // Firefox needs HTML for scrollposition
				var className = this.scrollTop >= (this.winHeight - 160 ) ? '' : 'isTop';
				this.$els.menu.className = className;
			},
			watchHeader: function(e) {
				this.winHeight = this.$el.getBoundingClientRect().height;
				this.$els.header.style.height = this.winHeight + 'px';
				this.$els.app.style.paddingTop = this.winHeight + 'px';
			},
			headerTransition: function(e) {
				var scalePercentage = this.scrollTop / this.winHeight;
				this.$els.headerContent.style['filter'] = "blur(" + ((scalePercentage * 20)) + "px)";
				this.$els.headerContent.style[this.fix.lowercase + 'Filter'] = "blur(" + ((scalePercentage * 20)) + "px)";
				if (scalePercentage >= 1) scalePercentage = 1;
				//this.$els.headerBackground.style['transform'] = "scale(" + (1 + (scalePercentage / 2)) + ")";
				this.$els.headerContent.style['transform'] = "translateY(" + (1 + (scalePercentage * 100)) + "px)";
				this.$els.headerContent.style[this.fix.lowercase + 'Transform'] = "translateY(" + (1 + (scalePercentage * 100)) + "px)";
				this.$els.headerContent.style.opacity = 1 - (scalePercentage * 1.2);
			},
			contactMe: function() {
				window.location.href = "mailto:sanjay@twisk-interactive.nl";
			}
		}
	});
})