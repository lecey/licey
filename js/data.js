/*
 * ============================================================
 *  КОНФИГУРАЦИЯ САЙТА — единственный файл для редактирования
 * ============================================================
 *
 *  Галерея — массив объектов. Каждый объект = одна «сцена»:
 *    main       — большое фото (центр)
 *    sideTop    — правое верхнее
 *    sideBottom — правое нижнее
 *
 *  Пути к фото — от папки photos/ (photoFolder).
 *  Просто добавьте новый объект в gallery.
 *
 *  heroGridLayout — позиции ячеек на desktop / tablet / mobile.
 *    col, row — начало; colSpan, rowSpan — сколько ячеек занимает.
 *
 *  Программы — icon: ключ из js/icons.js, iconColor: цвет круга.
 *
 * ============================================================
 */

var siteConfig = {

  brand: {
    name: "Лицей для малышей",
    logo: "assets/logo.svg",
    logoAlt: "Лицей для малышей"
  },

  meta: {
    title: "Лицей для малышей — Детский образовательный центр",
    description: "Тёплая среда для развития, обучения и творчества детей от 1 до 7 лет."
  },

  header: {
    phone: "8 (928) 28-28-108",
    phoneHref: "tel:+79282828108",
    social: [
      { name: "MAX", href: "https://max.ru/u/f9LHodD0cOJSSv3xnoct6lqshjy9bCZrWcLe1SzkfZ9uWSdndmFyICzDlHQ", label: "Макс", icon: "max" },
      { name: "VK", href: "https://vk.com/babylicey123", label: "ВКонтакте", icon: "vk" }
    ]
  },

  footer: {
    phone: "8 (928) 28-28-108",
    phoneHref: "tel:+79282828108",
    social: [
      { name: "MAX", href: "https://max.ru/u/f9LHodD0cOJSSv3xnoct6lqshjy9bCZrWcLe1SzkfZ9uWSdndmFyICzDlHQ", label: "Макс", icon: "max" },
      { name: "VK", href: "https://vk.com/babylicey123", label: "ВКонтакте", icon: "vk" }
    ],
    copyright: "© 2026 Лицей для малышей. Все права защищены."
  },

  hero: {
    title: "Лицей для малышей",
    subtitle: "Тёплая среда для развития, обучения и творчества детей от 1 до 7 лет"
  },

  /*
   * Раскладка hero-блока (4 колонки × 3 строки на desktop).
   * Меняйте col / row / colSpan / rowSpan для каждого breakpoint.
   */
  heroGridLayout: {
    desktop: {
      columns: 4,
      rows: 3,
      cells: {
        schedule: { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
        address: { col: 1, row: 2, colSpan: 1, rowSpan: 1 },
        rating: { col: 1, row: 3, colSpan: 1, rowSpan: 1 },
        main: { col: 2, row: 1, colSpan: 2, rowSpan: 3 },
        sideTop: { col: 4, row: 1, colSpan: 1, rowSpan: 2 },
        sideBottom: { col: 4, row: 3, colSpan: 1, rowSpan: 1 }
      }
    },
    tablet: {
      columns: 6,
      rows: 4,
      cells: {
        main: { col: 1, row: 1, colSpan: 4, rowSpan: 2 },
        sideTop: { col: 5, row: 1, colSpan: 2, rowSpan: 1 },
        sideBottom: { col: 5, row: 2, colSpan: 2, rowSpan: 1 },
        schedule: { col: 1, row: 3, colSpan: 3, rowSpan: 1 },
        address: { col: 4, row: 3, colSpan: 3, rowSpan: 1 },
        rating: { col: 1, row: 4, colSpan: 6, rowSpan: 1 }
      }
    },
    mobile: {
      columns: 2,
      rows: 6,
      cells: {
        main: { col: 1, row: 1, colSpan: 2, rowSpan: 2 },
        sideTop: { col: 1, row: 3, colSpan: 1, rowSpan: 1 },
        sideBottom: { col: 2, row: 3, colSpan: 1, rowSpan: 1 },
        schedule: { col: 1, row: 4, colSpan: 2, rowSpan: 1 },
        address: { col: 1, row: 5, colSpan: 2, rowSpan: 1 },
        rating: { col: 1, row: 6, colSpan: 2, rowSpan: 1 }
      }
    }
  },

  infoBlocks: {
    schedule: {
      icon: "clock",
      title: "Режим работы",
      lines: ["Пн-Сб: с 09:00 до 20:00", "Воскресенье: выходной"]
    },
    address: {
      icon: "map-pin",
      title: "Адрес",
      text: "ул. Героя Яцкова 9к3, г. Краснодар",
      mapLink: { text: "Смотреть на карте", href: "https://yandex.ru/maps/org/litsey_dlya_malyshey/111308832196/?ll=39.038114%2C45.070867&z=17.13" }
    },
    rating: {
      icon: "award",
      title: "Хорошее место 2026",
      rating: "5,0",
      reviews: "81 оценка",
      reviewsLink: "https://yandex.ru/maps/org/litsey_dlya_malyshey/111308832196/reviews/?ll=39.038114%2C45.070867&z=17.13"
    }
  },

  photoFolder: "photos",

  gallery: [
    {
      main: "01-main.webp",
      sideTop: "01-side-top.webp",
      sideBottom: "01-side-bottom.webp"
    },
    {
      main: "02-main.webp",
      sideTop: "02-side-top.webp",
      sideBottom: "02-side-bottom.webp"
    }
  ],

  cta: {
    text: "Поможем подобрать группу по возрасту и ответим на вопросы",
    phone: "8 (928) 28-28-108",
    phoneHref: "tel:+79282828108"
  },

  programsSection: {
    title: "Наши программы",
    subtitle: "Возраст, формат и стоимость обучения"
  },

  programs: [
    {
      title: "Мама и малыш",
      ageBadge: "1–3 лет",
      icon: "mother-child",
      iconColor: "#ED1651",
      prices: ["4 занятия — 2550 ₽", "8 занятий — 4700 ₽"],
      description: ["Группы 1–2 года, 2-2,5 года", "45 минут, 2 раза в неделю"]
    },
    {
      title: "Маленький гений",
      ageBadge: "2,5–3,5 года",
      icon: "lightbulb",
      iconColor: "#FFCB05",
      prices: ["4 занятия — 2550 ₽", "8 занятий — 4700 ₽"],
      description: ""
    },
    {
      title: "Группа неполного дня",
      ageBadge: "2–5 лет",
      icon: "time",
      iconColor: "#00C0F3",
      prices: ["8 занятий — 4600 ₽"],
      description: ["Группы 2-3,8 лет, 3,8-5 лет", "45 мин., 2 раза в неделю"]
    },
    {
      title: "Логоритмика",
      ageBadge: "от 2,5 лет",
      icon: "music",
      iconColor: "#5319B2",
      prices: ["8 занятий — 4500 ₽"],
      description: ["40 мин., 2 раза в неделю"]
    },
    {
      title: "Познавайка",
      ageBadge: "3–5 лет",
      icon: "globe",
      iconColor: "#A6CE39",
      prices: ["8 занятий — 4600 ₽"],
      description: ["Группы 3-4 года, 4-5 лет", "45 мин., 2 раза в неделю"]
    },
    {
      title: "Подготовка к школе",
      ageBadge: "5–7 лет",
      icon: "book",
      iconColor: "#ED1651",
      prices: ["8 занятий — 4600 ₽"],
      description: ["Группы 5-6 лет, 6-7 лет", "1 час, 2 раза в неделю"]
    },
    {
      title: "Английский язык",
      ageBadge: "от 5 лет",
      icon: "language",
      iconColor: "#FFCB05",
      prices: ["8 занятий — 4400 ₽"],
      description: ["45 мин., 2 раза в неделю"]
    },
    {
      title: "Художественная студия",
      ageBadge: "от 4 лет",
      icon: "palette",
      iconColor: "#00C0F3",
      prices: ["4 занятия — 2500 ₽", "8 занятий — 4600 ₽"],
      description: ["1 час, 2 раза в неделю"]
    },
    {
      title: "Творческая мастерская",
      ageBadge: "от 4 лет",
      icon: "craft",
      iconColor: "#5319B2",
      prices: ["4 занятия — 2500 ₽", "8 занятий — 4500 ₽"],
      description: ["1 час, 2 раза в неделю"]
    },
    {
      title: "Юный химик",
      ageBadge: "от 6 лет",
      icon: "flask",
      iconColor: "#A6CE39",
      prices: ["4 занятий — 3000 ₽"],
      description: ["час, 1 раз в неделю"]
    },
    {
      title: "Логопед",
      ageBadge: "от 3 лет",
      icon: "speech",
      iconColor: "#ED1651",
      prices: ["1 занятие — 950 ₽"],
      description: ["Разовое занятие (40 мин)"]
    },
    {
      title: "Психолог",
      ageBadge: "1-3 лет",
      icon: "heart",
      iconColor: "#FFCB05",
      prices: ["1 занятие — 2900 ₽"],
      description: ["Разовое занятие (60 мин)"]
    }
  ],

  promo: {
    icon: "logo2.svg",
    title: "Для детей от 7 лет",
    subtitle: "Подготовка к экзаменам и развитие навыков обучения",
    buttonText: "Перейти в Лицей 7+",
    href: "#"
  }
};
