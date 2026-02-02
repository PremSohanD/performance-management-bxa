const KeyResultsInput = ({ value, onChange }) => {
  const addKR = () =>
    onChange([...value, { metric: "", targetValue: "" }]);

  const updateKR = (i, field, val) => {
    const copy = [...value];
    copy[i][field] = val;
    onChange(copy);
  };

  return (
    <div>
      <h4>Key Results</h4>

      {value.map((kr, i) => (
        <div key={i}>
          <input
            placeholder="Metric"
            value={kr.metric}
            onChange={(e) =>
              updateKR(i, "metric", e.target.value)
            }
            required
          />
          <input
            type="number"
            placeholder="Target"
            value={kr.targetValue}
            onChange={(e) =>
              updateKR(i, "targetValue", e.target.value)
            }
            required
          />
        </div>
      ))}

      <button type="button" onClick={addKR}>
        + Add Key Result
      </button>
    </div>
  );
};

export default KeyResultsInput;
