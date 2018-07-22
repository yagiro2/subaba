// TODO
function Loader($container, options = {}) {
    const {
        size = this.defaults.size,
        interval = this.defaults.intervalMs,
    } = options;

    this.val = this.defaults.val;
    this.size = size;
    this.intervalMs = interval;

    this.$container = $container;
    this.$loader = $('<div>').append(this.val);

    this.tick = this.tick.bind(this);
}

Loader.prototype.defaults = {
    val: '.',
    size: 10,
    intervalMs: 300,
};

Loader.prototype.reset = function() {
    this.val = this.defaults.val;
    this.$loader.html(this.val);
}

Loader.prototype.start = function() {
    if (!this.on) {
        this.on = true;
        this.reset();
        this.$container.append(this.$loader);
        this.intervalId = setInterval(this.tick, this.intervalMs);
    }
}

Loader.prototype.tick = function() {
    this.val = this.val.length < this.size
        ? this.val + '.'
        : this.defaults.val;
    this.$loader.text(this.val);
}

Loader.prototype.stop = function() {
    if (this.on) {
        this.$loader.detach();
        clearInterval(this.intervalId);
        this.on = false;
    }
}

Loader.prototype.attach = function($container) {
    this.$loader.detach();
    this.$container = $container;
    this.$container.append(this.$loader);
}