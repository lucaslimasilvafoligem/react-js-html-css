interface Person {
    name: string,
    age?: number;
};

const person: Person = { 
    name: "Lucas",
    age: 3
};

console.log(person.name, person.age);
