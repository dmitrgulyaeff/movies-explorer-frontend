import confetti from "canvas-confetti";

export default function launchConfetti() {

  confetti({
    particleCount: 20,
    angle: 60,
    spread: 55,
    origin: { x: 0 }
  });
  confetti({
    particleCount: 20,
    angle: 120,
    spread: 55,
    origin: { x: 1 }
  });
};
