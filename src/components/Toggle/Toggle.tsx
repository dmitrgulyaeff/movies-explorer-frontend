import './Toggle.css'
import classNames from 'classnames'


interface ToggleProps {
  className: string,
  enabled: boolean,
  toggle: () => void
}

export default function Toggle({enabled, toggle, className} : ToggleProps) {
  
    return (
      <div className={classNames('toggle', {'toggle_active': enabled}) + ` ${className}`} onClick={toggle}>
        <div className={classNames('toggle__circle', {'toggle__circle_active': enabled})} />
      </div>
    )
};
