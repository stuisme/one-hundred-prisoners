const getPrisoners = () => {
  const prisoners: number[] = [];
  for (let i = 1; i <= 100; i++) {
    prisoners.push(i);
  }
  return prisoners;
};

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

const randomizeBoxes = (prisoners: number[]) => {
  const result: Record<string, number> = {};
  const options = [...prisoners];

  let boxNumber = 1;
  while (options.length > 0) {
    const [prisonerNumber] = options.splice(getRandomNumber(options.length), 1);
    result[boxNumber] = prisonerNumber;
    boxNumber++;
  }
  return result;
};

const followTheChain = (
  prisoner: number,
  boxNumber: number,
  boxes: Record<string, number>,
  count = 0
): { count: number } => {
  const currentCount = count + 1;
  const openBox = boxes[boxNumber.toString()];
  if (openBox === prisoner) {
    return { count: currentCount };
  }

  return followTheChain(prisoner, openBox, boxes, currentCount);
};

const runSimulation = () => {
  const prisoners = getPrisoners();
  const boxes = randomizeBoxes(prisoners);

  let passCount = 0;

  for (let prisoner of prisoners) {
    const { count } = followTheChain(prisoner, prisoner, boxes, 0);

    if (count > 50) {
      console.log(`Failed on prisioner ${prisoner} with a chain of ${count}`);
      console.log(`Total passed: ${passCount}`);
      return false;
    }

    // console.log(`Passed prisioner ${prisoner} with a chain of ${count}`);
    passCount++;
  }
  console.log(`Total passed: ${passCount} 🎉`);
  return true;
};

const main = () => {
  const results = {
    success: 0,
    fail: 0,
  };
  for (let i = 0; i < 100000; i++) {
    console.log(`Starting simulation ${i + 1}`);
    const result = runSimulation();

    results[result ? "success" : "fail"]++;
  }

  console.log(results);
};

main();
