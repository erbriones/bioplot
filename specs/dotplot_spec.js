describe("dotplot", function() {
    var element;
    var plot;

    beforeEach(function() {
        element = d3.select(document.body).append('div');
        plot = new dotplot(element, {});
    })

    afterEach(function() {
        element.remove('div');
    });

    it("should set default configuration.", function() {
        expect(plot.config.size.width).toBe(700);
        expect(plot.config.size.height).toBe(700);

        expect(plot.config.padding.top).toBe(20);
        expect(plot.config.padding.bottom).toBe(20);
        expect(plot.config.padding.left).toBe(20);
        expect(plot.config.padding.right).toBe(40);

        expect(plot.config.title).toBeUndefined();
        expect(plot.config.xlabel).toBeUndefined();
        expect(plot.config.ylabel).toBeUndefined();

        expect(plot.config.extent.horizontal).toEqual([0, 700]);
        expect(plot.config.extent.vertical).toEqual([0, 700]);
    });

    it("should override default configuration", function() {
        plot.configure({
            size: {
                width: 800,
                height: 500
            },
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            },
            extent: {
                horizontal: [10, 1000],
                vertical: [20, 2000],
            },
            title: 'title',
            xlabel: 'xlabel',
            ylabel: 'ylabel'
        });

        expect(plot.config.size.width).toBe(800);
        expect(plot.config.size.height).toBe(500);

        expect(plot.config.padding.top).toBe(10);
        expect(plot.config.padding.bottom).toBe(10);
        expect(plot.config.padding.left).toBe(10);
        expect(plot.config.padding.right).toBe(10);

        expect(plot.config.title).toBe('title');
        expect(plot.config.xlabel).toBe('xlabel');
        expect(plot.config.ylabel).toBe('ylabel');

        expect(plot.config.extent.horizontal).toEqual([10, 1000]);
        expect(plot.config.extent.vertical).toEqual([20, 2000])
    })
});