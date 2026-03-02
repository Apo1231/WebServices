const stylesButtonPrimary = {
    backgroundColor: '#cc3ee4',
    borderRadius: '10px',
    color: '#ffffff',
    border: 'none',
    padding: '2px 10px'
};

const stylesButtonSecondary = {
    backgroundColor: '#ededed',
    borderRadius: '10px',
    color: '#363636',
    border: 'none',
    padding: '2px 10px',
    cursor: 'pointer'
};

function Button({type, action, text = "Wihooo"}) {

  return (
    <button
      /*className={props.type === "primary" ?
        "button-primary" : "button-secondary"
      }*/

    style={type === "primary" ?
     stylesButtonPrimary : {
        ...stylesButtonSecondary,
        backgroundColor: '#363636',
        color: '#ffffff'
     }
    }

    onClick={action ? action : () => alert("Wihooo")}
    >
      <p>{text}</p>
    </button>
  );
}

export default Button;
