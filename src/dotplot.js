function dotplot(element, config) {
    var self = this;
    this.element = element;
    this.scales = {
        horizontal: d3.scale.linear(),
        vertical: d3.scale.linear()
    };

    this.configure = function(configuration) {
        this.config = configuration || {};
        this.config.coordinates = this.config.coordinates || "default";

        this.config.size = this.config.size || {
            width: 700,
            height: 700
        };
        this.config.padding = this.config.padding || {
            top : this.config.title ? 40 : 20,
            right : 40,
            bottom : this.config.xlabel ? 50 : 20,
            left : this.config.ylabel ? 50 : 20
        };
        this.config.extent = this.config.extent || {
            default: {
                vertical: [0, this.config.size.width],
                horizontal: [0, this.config.size.width]
            }
        };

        if (!this.config.extent.hasOwnProperty(this.config.coordinates)) {
            throw new Error("An extent does not exist for this coordinate system");
        }

        this.scales.horizontal
            .domain(this.config.extent[this.config.coordinates].horizontal)
            .range([0, this.config.size.width]);

        this.scales.vertical
            .domain(this.config.extent[this.config.coordinates].vertical)
            .range([this.config.size.height, 0]);
    };

    this.render = function () {
        var vwidth = self.config.size.width + self.config.padding.left + self.config.padding.right,
            vheight = self.config.size.height + self.config.padding.top + self.config.padding.bottom;

        self.viewport = d3.select(self.element).append("svg")
            .attr("width",  vwidth)
            .attr("height", vheight)
            .append("g")
            .attr("transform", translate(self.config.padding.left,
                    self.config.padding.top));

        self.view = self.viewport.append("g")
            .attr("transform", translate(5, 5))
            .append("rect")
            .attr("width", self.config.size.width)
            .attr("height", self.config.size.height)
            .attr("pointer-events", "all");

        if (self.config.title) {
            self.viewport.append("text")
                .attr("class", "axis")
                .text(self.config.title)
                .attr("x", self.config.size.width / 2)
                .attr("dy", "-1em")
                .style("text-anchor", "middle");
        }

        if (self.config.xlabel) {
            self.viewport.append("text")
                .attr("class", "axis x")
                .text(self.config.xlabel)
                .attr("x", self.config.size.width / 2)
                .attr("y", self.config.size.height)
                .attr("dy", "2.5em")
                .style("text-anchor", "middle");
        }

        if (self.config.ylabel) {
            self.viewport.append("text")
                .attr("class", "axis y")
                .text(self.config.ylabel)
                .style("text-anchor", "middle")
                .attr("transform", transform(-10, self.config.size.height/2, 90));
        }
    };

    d3.select(element).attr("class", "ui-bioplot-dotplot");
    this.configure(config);
}
