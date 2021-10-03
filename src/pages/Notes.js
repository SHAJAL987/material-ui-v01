import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router'


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    display: 'block'
  },
  formSpace:{
    width:'500px'
  }
})

export default function Notes() {

  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [gender, setGender] = useState('Male')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }

    if (details == '') {
      setDetailsError(true)
    }

    if (title && details) {
      console.log(title, details, gender)
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(
          {
            title,
            details,
            gender
          }
        )
      }).then(() => history.push('/create'))

    }
  }


  return (
    <div>
      {/* <Typography
        variant="h6"
        color="secondary"
        className={classes.field}
      >
        Simple Mui Form
      </Typography> */}

      <Card elevation={1}>
        <CardHeader
          title="Input Form"
        />
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.formSpace}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              className={classes.field}
              label="Name"
              variant="outlined"
              color="secondary"
              // size="small"
              //fullWidth
              required
              error={titleError}
            />
            <TextField
              onChange={(e) => setDetails(e.target.value)}
              className={classes.field}
              label="Details"
              variant="outlined"
              color="secondary"
              // size="small"
              //fullWidth
              required
              multiline
              rows={4}
              error={detailsError}
            />

            <FormControl className={classes.field}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  control={<Radio />}
                  value="Male"
                  label="Male"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="Fmale"
                  label="Female"
                />
                <FormControlLabel
                  control={<Radio />}
                  value="Others"
                  label="Others"
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              className={classes.field}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
