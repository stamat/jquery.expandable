(function ($) {
    $.fn.expandable = function(params) {
		var $this = $(this);

		if (params === undefined || params === null) {
			params = {};
		}

		var defaults = {
			'height': 200,
			'more': 'Show more',
			'less': 'Show less',
			'no_less': false,
			'offset': 0,
			'animation_duration': 250,
			'expand_responsive': 0
		};

		for (var k in defaults) {
			if (!params.hasOwnProperty(k)) {
				params[k] = defaults[k];
			}
		}

		var $expand_bar = $('<a class="expand-bar"><span class="more">' + params.more
			+ '</span><span class="less" style="display: none">' + params.less
			+ '</span><i></i></a>');

		$expand_bar.on('click', function(){
			var $root = $(this).closest('.expandable');
			var $wrap = $root.find('.expandable-init');
			var $more = $(this).find('.more');
			var $less = $(this).find('.less');

			if (params === undefined || params === null) {
				params = $wrap.data('expand_params');
			}

			if ($root.hasClass('expanded')) {
				$root.css('height', $wrap.outerHeight(true));
				setTimeout(function() {
					$root.css('height', params.height);
				}, 1);

				$less.hide();
				$more.show();
				$root.removeClass('expanded');
			} else {
				$root.css({
					'height': $wrap.outerHeight(true)
				});
				$less.show();
				$more.hide();

				setTimeout(function(){
					$root.css('height', 'auto');
				}, params.animation_duration);

				$root.addClass('expanded');

                if (params.no_less) {
                    $(this).hide();
                    $(this).unbind('click');
                    $wrap.unbind('expandable_resize')
                }
			}
		});

		function checkHeight($elem) {
			var oh = $elem.outerHeight(true);
			var $root = $elem.parent();

			var $expand_bar = $root.find('.expand-bar');

			var params = $elem.data('expand_params');
			if (params === undefined || params === null) {
				params = {
					'offset': 0,
					'height': defaults.height
				}
			}

			if (params.expand_responsive > 0 && params.expand_responsive > window.innerWidth) {
				$root.css('height', 'auto');
				$expand_bar.hide();
				return;
			}

			if (oh <= params.height + params.offset) {
				$root.css('height', 'auto');
				$expand_bar.hide();
			} else {
                if (!$root.hasClass('expanded')) {
                    $root.css('height', params.height);
                }
				$expand_bar.show();
			}
		}

		for (var i = 0; i < $this.length; i++) {
			var $elem = $($this[i]);

			if ($elem.hasClass('expandable-init')) {
				continue;
			}

			$elem.addClass('expandable-init');

			if ($elem.css('padding-top') === '0px') {
				$elem.css('padding-top', '1px');
			}

			if ($elem.css('padding-bottom') === '0px') {
				$elem.css('padding-bottom', '1px');
			}

			var $root = $('<div class="expandable" />');
			$elem.on('expandable_resize', function(){
				checkHeight($(this));
			});

			$root.insertBefore($elem);
			$elem.detach();
			$root.append($elem);

			$root.css({
				'overflow': 'hidden',
				'position': 'relative',
				'height': params.height
			});

			$elem.data('expand_params', params);

			$root.append($expand_bar.clone(true));
		}

		function onResize() {
			$this.trigger('expandable_resize');
		}
		$(window).on('resize', onResize);
		onResize();

		return $this;
	};
 })(jQuery);
