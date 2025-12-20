import "./css/typingtest.css";
import TypingTestOverlay from "./TypingTestOverlay";
import { useState } from "react";
const TypingTest = () => {
  const [testStarted, setTestStarted] = useState(false);

  function handleClick() {
    setTestStarted(true);
  }
  return (
    <section className="typing-section">
      {!testStarted && <TypingTestOverlay startTest={handleClick} />}
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, dolorum
        eaque. Hic, dolorem, fuga, quaerat accusamus in nobis deserunt animi
        totam ipsa illo itaque repellat fugiat beatae. Sapiente magnam labore a
        similique minus architecto quisquam non doloribus, corrupti dolor
        voluptatem dolorum culpa nihil vero necessitatibus pariatur quae.
        Molestiae qui esse sapiente et, earum hic maxime aliquam ipsam rerum
        quisquam ipsum voluptatibus? Nam beatae quae iusto, temporibus
        voluptatibus maiores similique vitae explicabo quidem minima illo vel
        necessitatibus eum impedit eaque veniam commodi ea sint debitis,
        delectus suscipit neque eos. Architecto nulla minus atque modi
        similique, voluptates sit deserunt necessitatibus sed minima.
      </p>
    </section>
  );
};

export default TypingTest;
