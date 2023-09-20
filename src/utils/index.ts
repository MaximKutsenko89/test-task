export function idGenerator(value: number): string {
   const nums = [..."1234567890"];
   let out = "";
   for (let i = 0; i < value; i++) {
      const randomIndex = Math.floor(Math.random() * nums.length);
      out += nums[randomIndex];
   }

   return "#" + out;
}
