class person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	greetings() {
		console.log(`My name is ${this.name} and I'm ${this.age}`);
	}
}

module.exports = person;