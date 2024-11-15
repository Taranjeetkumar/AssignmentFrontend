import React from 'react';
import '../App.css'

function ConditionBuilder({ conditions, setConditions, setConditionType }) {
    const addCondition = () => {
        setConditions([...conditions, { field: '', operator: '', value: '' }]);
    };

    const handleConditionChange = (index, key, value) => {
        const newConditions = conditions.slice();
        newConditions[index][key] = value;
        setConditions(newConditions);
    };

    return (
        <div className='conditionContainer'>
            <h3>Define Audience Segment</h3>
            {conditions.map((condition, index) => (
                <div key={index} className='conditionRow'>
                    <select
                        onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
                        className='select'
                    >
                        <option value="totalSpending">Total Spending</option>
                        <option value="visits">Visits</option>
                        <option value="lastVisit">Last Visit</option>
                    </select>
                    <select
                        onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                        className='select'
                    >
                        <option value=">">Greater than</option>
                        <option value="<=">Less than or equal to</option>
                        <option value="not visited in last">Not visited in last (months)</option>
                    </select>
                    <input
                        type="number"
                        onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                        placeholder="Value"
                        className='input'
                    />
                </div>
            ))}

            {
                conditions.length > 0 ? (
                    <div  className='conditionRow'>
                    <p> Select Codition to apply :</p>
                    <select
                        onChange={(e) => setConditionType(e.target.value)}
                        className='select'
                    >
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                    </select>
                    </div>
                ): ""
      }
            <button onClick={addCondition} className='addButton'>Add Condition</button>
        </div>
    );
}

export default ConditionBuilder;
