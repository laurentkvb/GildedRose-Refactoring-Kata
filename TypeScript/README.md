# Gilded Rose

This is the Gilded Rose kata in TypeScript.

## Approach

My approach was as follows and can be divided into three parts
1. Understanding the assignment's context.
2. Writing test
3. Development and testing iteratively.

### 1. Understanding the assignment's context. [10-20 minutes]
- Read the description of the assignment.
- Watch the video of Emily Bache about the Gilded Rose Kata
- Fork the repo

### 2. Writing tests [30 - 40 minutes]
**Rationale**: the rationale for writing the test is to maintain the core functions of the application, I want to provide the tests that make sure
that those functions kept working. This would be useful later during the development, when I modify the code and still want to
see if the code is still working as intended.
- Run the tests that were mentioned in the video
- Write tests to the code based on the requirements of assignment, all of the happy flows.

### 3. Development and testing iteratively. [60 - 100 minutes]
- Identify flow of the code, variables, if statements that are being used.
  - I identified that there were 2 processes:
  - (1) process where the current quality value is checked - adjustQuality()
  - (2) process where the sell in values changes which affects the quality value - adjustSellin()
- Added prettier as well just remain sane regarding the code indentation.

Refactor steps:
- replacing the for-loop with a for-of loop
- Merge if-statements when no subsequent 'else' blocks exists
- Extracting functions as a separate to code and concerns, could be useful to test individually.
  - (1) separate function for "Backstage" pass function
  - (2) separate functions for checking the name of item
  - (3) separate functions for decrease / increase / resetting quantity
- Initially, ensure the separation of the adjustQuality() function.
- Subsequently, isolate and utilize the adjustSellint() function.
- Enhance the current implementation by, for example, inverting if statements where the function checks for false variables.
- Incorporate tests and code for the conjured item.

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

There are two unit test frameworks to choose from, Jest and Mocha.

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

Mocha

```sh
npm run test:mocha
```


## Run the TextTest fixture from the Command-Line

_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).


## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Python executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/python/texttest_fixture.py
    interpreter:python


