import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { colors } from '../shared/colors';
import { createUseStyles } from 'react-jss';
import { FunctionComponent } from 'react';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const useStyles = createUseStyles({
  avatar: {
    "color": colors.white,
  },
})

interface IImageAvatarsProps {
  onClick: any;
  url?: string;
}

const ImageAvatars: FunctionComponent<IImageAvatarsProps> = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container={true}
      direction="row"
      justify="flex-end"
      alignItems="center"
    >
      <Grid item={true} xs={12} sm={2}>
        <AccountCircleOutlinedIcon className={classes.avatar} onClick={props.onClick}
          fontSize="large"/>
      </Grid>
    </Grid>
  )
}

export default ImageAvatars;
