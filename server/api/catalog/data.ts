import type { Products } from '@/types/Products'

export default defineEventHandler(() => {
  const data: Products[] = [
    {
      category: {
        name: 'Фрукты',
        link: 'fruits',
        icon: '/images/categories/icon-fruits.png',
      },
      products: [
        {
          id: 1,
          name: 'Грейпфрут',
          image: '/images/catalog/fruits/fruits-1.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 1 },
            { name: 'Кислинка', value: 2 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 2,
          name: 'Виноград',
          image: '/images/catalog/fruits/fruits-2.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 1 },
            { name: 'Холодок', value: 0.5 },
          ],
        },
        {
          id: 3,
          name: 'Гуава',
          image: '/images/catalog/fruits/fruits-3.png',
          label: null,
          parameter: [
            { name: 'Сладость', value: 2.5 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 1 },
          ],
        },
        {
          id: 4,
          name: 'Манго',
          image: '/images/catalog/fruits/fruits-4.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 3 },
            { name: 'Кислинка', value: 1 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 5,
          name: 'Киви',
          image: '/images/catalog/fruits/fruits-5.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 1.5 },
            { name: 'Кислинка', value: 2.5 },
            { name: 'Холодок', value: 1 },
          ],
        },
        {
          id: 6,
          name: 'Дыня',
          image: '/images/catalog/fruits/fruits-6.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 3 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 0.5 },
          ],
        },
      ],
    },
    {
      category: {
        name: 'Десерты',
        link: 'desserts',
        icon: '/images/categories/icon-desserts.png',
      },
      products: [
        {
          id: 7,
          name: 'Чизкейк',
          image: '/images/catalog/desserts/desserts-1.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 3 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 8,
          name: 'Эклер',
          image: '/images/catalog/desserts/desserts-2.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2.5 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 9,
          name: 'Тирамису',
          image: '/images/catalog/desserts/desserts-3.png',
          label: null,
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 1 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 10,
          name: 'Макарон',
          image: '/images/catalog/desserts/desserts-4.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2.5 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 11,
          name: 'Брауни',
          image: '/images/catalog/desserts/desserts-5.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 12,
          name: 'Мороженое',
          image: '/images/catalog/desserts/desserts-6.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 3 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 2 },
          ],
        },
      ],
    },
    {
      category: {
        name: 'Классика',
        link: 'classic',
        icon: '/images/categories/icon-classic.png',
      },
      products: [
        {
          id: 13,
          name: 'Шоколад',
          image: '/images/catalog/classic/classic-1.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2.5 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 14,
          name: 'Карамель',
          image: '/images/catalog/classic/classic-2.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 3 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 15,
          name: 'Орех',
          image: '/images/catalog/classic/classic-3.png',
          label: null,
          parameter: [
            { name: 'Сладость', value: 1.5 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 16,
          name: 'Ваниль',
          image: '/images/catalog/classic/classic-4.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 17,
          name: 'Кокос',
          image: '/images/catalog/classic/classic-5.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 18,
          name: 'Миндаль',
          image: '/images/catalog/classic/classic-6.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 1.5 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 0 },
          ],
        },
      ],
    },
    {
      category: {
        name: 'Напитки',
        link: 'drinks',
        icon: '/images/categories/icon-drinks.png',
      },
      products: [
        {
          id: 19,
          name: 'Лимонад',
          image: '/images/catalog/drinks/drinks-1.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 2 },
            { name: 'Холодок', value: 2 },
          ],
        },
        {
          id: 20,
          name: 'Кофе',
          image: '/images/catalog/drinks/drinks-2.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 1 },
            { name: 'Кислинка', value: 2 },
            { name: 'Холодок', value: 0 },
          ],
        },
        {
          id: 21,
          name: 'Молочный коктейль',
          image: '/images/catalog/drinks/drinks-3.png',
          label: null,
          parameter: [
            { name: 'Сладость', value: 2.5 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 1.5 },
          ],
        },
        {
          id: 22,
          name: 'Айс-ти',
          image: '/images/catalog/drinks/drinks-4.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 1.5 },
            { name: 'Холодок', value: 2.5 },
          ],
        },
        {
          id: 23,
          name: 'Смузи',
          image: '/images/catalog/drinks/drinks-5.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2.5 },
            { name: 'Кислинка', value: 1 },
            { name: 'Холодок', value: 1 },
          ],
        },
        {
          id: 24,
          name: 'Матча латте',
          image: '/images/catalog/drinks/drinks-6.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 1.5 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 1 },
          ],
        },
      ],
    },
    {
      category: {
        name: 'Растения',
        link: 'plants',
        icon: '/images/categories/icon-plants.png',
      },
      products: [
        {
          id: 25,
          name: 'Мята',
          image: '/images/catalog/plants/plants-1.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 0.5 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 3 },
          ],
        },
        {
          id: 26,
          name: 'Базилик',
          image: '/images/catalog/plants/plants-2.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 0 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 1 },
          ],
        },
        {
          id: 27,
          name: 'Розмарин',
          image: '/images/catalog/plants/plants-3.png',
          label: null,
          parameter: [
            { name: 'Сладость', value: 0 },
            { name: 'Кислинка', value: 0.5 },
            { name: 'Холодок', value: 1.5 },
          ],
        },
        {
          id: 28,
          name: 'Лаванда',
          image: '/images/catalog/plants/plants-4.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 0.5 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 2 },
          ],
        },
        {
          id: 29,
          name: 'Чабрец',
          image: '/images/catalog/plants/plants-5.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 0 },
            { name: 'Кислинка', value: 0 },
            { name: 'Холодок', value: 1 },
          ],
        },
        {
          id: 30,
          name: 'Имбирь',
          image: '/images/catalog/plants/plants-6.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 0.5 },
            { name: 'Кислинка', value: 2 },
            { name: 'Холодок', value: 1 },
          ],
        },
      ],
    },
    {
      category: {
        name: 'Миксы',
        link: 'mixes',
        icon: '/images/categories/icon-mixes.png',
      },
      products: [
        {
          id: 31,
          name: 'Ягодный микс',
          image: '/images/catalog/mixes/mixes-1.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 2.5 },
            { name: 'Холодок', value: 1 },
          ],
        },
        {
          id: 32,
          name: 'Тропический микс',
          image: '/images/catalog/mixes/mixes-2.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 3 },
            { name: 'Кислинка', value: 1 },
            { name: 'Холодок', value: 0.5 },
          ],
        },
        {
          id: 33,
          name: 'Цитрусовый микс',
          image: '/images/catalog/mixes/mixes-3.png',
          label: null,
          parameter: [
            { name: 'Сладость', value: 2 },
            { name: 'Кислинка', value: 3 },
            { name: 'Холодок', value: 1 },
          ],
        },
        {
          id: 34,
          name: 'Зелёный микс',
          image: '/images/catalog/mixes/mixes-4.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 1 },
            { name: 'Кислинка', value: 1.5 },
            { name: 'Холодок', value: 2 },
          ],
        },
        {
          id: 35,
          name: 'Овощной микс',
          image: '/images/catalog/mixes/mixes-5.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 1 },
            { name: 'Кислинка', value: 1 },
            { name: 'Холодок', value: 1 },
          ],
        },
        {
          id: 36,
          name: 'Экзотик микс',
          image: '/images/catalog/mixes/mixes-6.png',
          label: 'топ-15',
          parameter: [
            { name: 'Сладость', value: 2.5 },
            { name: 'Кислинка', value: 1.5 },
            { name: 'Холодок', value: 0.5 },
          ],
        },
      ],
    },
  ]

  return data
})
