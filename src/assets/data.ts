type tList = {
    name:string,
    sortProperty:string
}

export const list: tList[] = [
    {name: 'популярности', sortProperty: 'rating'},
    {name: 'цене', sortProperty: 'price'},
    {name: 'алфавиту', sortProperty: 'title'},
];

export const categories: string[] = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
]

export const typeNames: string[] = ['тонкое', 'традиционное'];



