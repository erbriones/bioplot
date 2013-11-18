function histogram(element, config) {
    var self = this;
    this.element = element;
    this.scales = {
        horizontal: d3.scale.linear(),
        vertical: d3.scale.linear()
    };

    this.configure = function (configuration) {
        this.config = configuration || {};
        this.config.size = this.config.size || {
            width: 700,
            height: 700
        };
        this.config.bins = this.config.bins || 50;
    };

    this.render = function() {
        this.plot = d3.select(element).append("svg")
                    .attr("width", self.config.size.width)
                    .attr("height", self.config.size.height);

        return self;
    };

    this.configure(config);
}
