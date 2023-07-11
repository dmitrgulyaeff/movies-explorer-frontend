import './Toggle.css'
import classNames from 'classnames'


interface ToggleProps {
  enabled: boolean,
  toggle: () => void
}

export default function Toggle({enabled, toggle} : ToggleProps) {
  
    return (
      <div className={classNames('toggle', {'toggle_active': enabled})} onClick={toggle}>
        <div className={classNames('toggle__circle', {'toggle__circle_active': enabled})} />
      </div>
    )
};
