(function () {
  const $ = this.jQuery;
  const Spinner = this.Spinner;

  const instance = new Spinner(800, 300);

  const items = [
    {
      label: "测试1",
      value: 1,
    },
    {
      label: "测试2",
      value: 2,
    },
    {
      label: "测试3",
      value: 3,
    },
    {
      label: "测试3",
      value: 3,
    },
    {
      label: "测试3",
      value: 3,
    },
  ];

  $("#root").append(instance.dom);

  $("#btn-start").click(() => {
    instance.startSpin(66);
  });

  $("#btn-stop").click(() => {
    instance.stopSpin();
  });

  instance.draw();
  instance.addSections(items);
  instance.drawSections();
})();
