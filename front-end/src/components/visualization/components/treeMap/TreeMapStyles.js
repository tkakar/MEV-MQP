import MEVColors from '../../../../theme';

export default {
  mainVisualization: {
    height: 'calc(65vh - 58px)',
    marginLeft: 'auto',
    padding: '36px 10px 10px 10px',
    transition: 'height 200ms ease-in-out',
  },
  treemapLabel: {
    width: 'fit-content',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#FFF',
    opacity: '0.25',
    zIndex: '105',
    left: '10px',
    transition: 'opacity 200ms ease-in-out',
  },
  treemapVisualization: {
    position: 'relative',
    height: '25%',
    overflow: 'visible',
    display: 'block',
  },
  treePaper: {
    'vertical-align': 'middle',
    display: 'inline-block',
  },
  clearFilterChip: {
    'font-size': '9pt',
    height: '14pt',
    right: '0px',
    transform: 'translateY(5px) translateX(-15px)',
    'box-shadow': '2px 5px 5px 0 rgba(0,0,0,0.3)',
    position: 'absolute',
    zIndex: 100,
  },
  chipAvatar: {
    height: '11pt',
    width: '11pt',
    transform: 'translateX(3px)',
  },
  treeMapColorLegend: {
    position: 'absolute',
    height: '20px',
    width: 'calc(100% - 20px)',
    background: `linear-gradient(90deg, ${MEVColors.notSevereLight}, ${MEVColors.severeLight})`,
    transform: 'translateY(-28px)',
    boxShadow: '0px -8px 20px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #dedede',
    padding: '0px 10px',
    lineHeight: '20px',
    textAlign: 'center',
  },
};
