export function update_state_event(state) {
  const bravo = state.empty ? 4 : 1;
  const combo = state.combo + 2 * state.lines - 2;
  const roundedUp = Math.ceil((state.level + state.lines) / 4);
  state.score = (roundedUp + state.soft) * state.lines * combo * bravo;
}
