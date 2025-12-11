import './DataTable.css'

const DataTable = (props) => {
  const data = props.data
  const tableType = props.tableType
  let fieldsArr = []
  // const fieldsArr = ['id', 'post_timestamp', 'short_caption', 'trial_reel', 'views',  'delta_views', 'reach', 'delta_reach', 'likes', 'delta_likes', 'comments', 'delta_comments', 'saves', 'delta_saves', 'shares', 'delta_shares', 'localized_timestamp'];
  if (tableType === "post_trends") {
    fieldsArr = ['local_time', 'delta_views', 'delta_reach', 'delta_likes', 'delta_comments', 'delta_saves', 'delta_shares']
  } else if (tableType === "latest_posts") {
    fieldsArr =  ['id','post_timestamp', 'short_caption',  'trial_reel', 'views', 'reach', 'likes', 'comments', 'saves', 'shares' ]
  }
  
  const labelFixer = (label) => {

    if (label=="local_time") {
      label = label.replace(/_/g, " ") 
    } else {
      label = label.replace(/delta_/g, "")
      label = label.replace(/_/g, " ") 
    }
    
    // Get the first character and convert it to uppercase
    const firstLetter = label[0].toUpperCase();
  
    // Get the rest of the string (starting from index 1) and convert to lowercase
    const restOfString = label.slice(1).toLowerCase();

    return firstLetter + restOfString;
  }

  return (
    <div className="data-table-container">
      <table className="data-table" style={ {gridTemplateColumns: `repeat(${fieldsArr.length}, auto)`}}>
        <thead>
          <tr>
            {fieldsArr.map((field, index) => (
              <th key={index}>{labelFixer(field)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            // 1. Loop through the data rows (item is an Object)
            data.map((item, index) => (
              <tr key={index}>
                {/* 2. Loop through the field names array (fieldsArr) */}
                {fieldsArr.map((field, fieldIndex) => (
                  // 3. Access the value from the item OBJECT using the field name as the key
                  <td key={fieldIndex}>
                    {field==='local_time' ? item[field] : item[field] ? item[field].toLocaleString('en-US'): 0} 
                  </td>
                ))}
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan={fieldsArr.length}>No data available</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
   
  );
};

export default DataTable;