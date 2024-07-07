import {Report, ReportType, useReports} from "@nui/src/state/reports.state";
import {
    Box,
    Button,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    MenuItem,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import {BugReport, Close, DirectionsWalk, QuestionMark, ReportProblem, Search} from "@mui/icons-material";
import React, {ChangeEvent, useState} from "react";
import {atom, useRecoilState} from "recoil";
import {TextField} from "../misc/TextField";
import {enqueueSnackbar} from "notistack";
import {EReportModalType, useReportModal} from "@nui/src/provider/ReportModalProvider";

const stepper = atom<number>({
    key: "setReportUserStepper",
    default: 0
})
const useStepper = () => useRecoilState(stepper)

function StepperContent({id}: { id: number }) {
    const [label, setLabel] = useState<string>("")
    const [type, setType] = useState<ReportType>(ReportType.Other)
    const [text, setText] = useState<string>("")

    const [errorFieldLabel, setErrorFieldLabel] = useState<boolean>(false)

    const [reports, setReports] = useReports()
    const reportModal = useReportModal()
    const [stepper, setStepper] = useStepper()

    const nextHandler = () => {
        if (stepper == 0){
            setErrorFieldLabel(label.length <= 4 ? true : false)

            label.length >= 4 && setStepper(stepper + 1)
        } else if (!(stepper >= 2)){
            setStepper(stepper + 1)
        } else if (stepper == 2) {
            text != "" ? (
                setReports([...reports, ({
                    type: type,
                    label: label,
                    text: text,
                    player: {
                        id: 1,
                        name: "test"
                    }
                })])
            ) : (
                setReports([...reports, ({
                    type: type,
                    label: label,
                    player: {
                        id: 1,
                        name: "test"
                    }
                })])
            )

            enqueueSnackbar("Report envoyé", {
                variant: "success"
            })

            setStepper(0)

            reportModal?.setData(null)
            reportModal?.setTypeModal(EReportModalType.UserDialog)
            reportModal?.setShowModal(false)
        }
    }

    const backHandler = () => {
        !(stepper <= 0) && setStepper(stepper - 1)
    }

    const changeLabelHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value)
    }

    const changeTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value as ReportType)
    }

    const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const typeIcon: { [Type in ReportType]: React.ReactElement } = {
        bug: <BugReport/>,
        player: <DirectionsWalk/>,
        problem: <ReportProblem/>,
        other: <QuestionMark/>
    }

    let content: React.ReactNode

    switch (id) {
        case 0:
            content = (
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}>
                    <TextField
                        variant="filled"
                        label="Titre"
                        onChange={changeLabelHandler}
                        error={errorFieldLabel}
                        required
                        sx={{
                            minWidth: "100%",
                            width: "fit-content"
                        }}
                    />
                    <TextField
                        variant={"filled"}
                        select
                        required
                        label={"Selectionner votre problème"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position={"start"}>
                                    <Search/>
                                </InputAdornment>
                            )
                        }} sx={{
                        minWidth: 200,
                        width: "fit-content"
                    }}
                        defaultValue={type}
                        onChange={changeTypeHandler}>
                        <MenuItem value={ReportType.Bug}>Bug</MenuItem>
                        <MenuItem value={ReportType.Player}>Player</MenuItem>
                        <MenuItem value={ReportType.Problem}>Problem</MenuItem>
                        <MenuItem value={ReportType.Other}>Other</MenuItem>
                    </TextField>
                </Box>
            )
            break
        case 1:
            content = (
                <>
                    <TextField
                        variant="filled"
                        label="Décrivez votre problème"
                        onChange={changeTextHandler}
                        sx={{
                            width: "100%"
                        }}
                    />
                </>
            )
            break
        case 2:
            content = (
                <Box sx={(theme) => ({
                    backgroundColor: theme.palette.background.default,
                    borderRadius: 2,
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                })}>
                    <Box display={"flex"} gap={1}>
                        <Box color={(theme) => theme.palette.primary.main}>{typeIcon[type]}</Box>
                        <Typography
                            style={{marginLeft: 5}}
                            variant="subtitle1"
                        >{label}</Typography>
                    </Box>
                    <Divider orientation="horizontal" />
                    <Typography
                        style={{marginLeft: 5}}
                        variant="subtitle1"
                    >{text}</Typography>
                </Box>
            )
            break
    }

    return (
        <>
            <Box>
                {content}
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Button variant="outlined" onClick={backHandler}>Précédent</Button>
                <Button variant="contained" onClick={nextHandler}>Suivant</Button>
            </Box>
        </>
    )
}

export default function ReportUserModal({data}: { data: Report | null }) {
    const [stepper, setStepper] = useStepper()

    const reportModal = useReportModal()

    const closeHandler = () => {
        setStepper(0)

        reportModal?.setData(null)
        reportModal?.setTypeModal(EReportModalType.UserDialog)
        reportModal?.setShowModal(false)
    }

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <DialogTitle sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>
                    {data?.label}
                </DialogTitle>
                <IconButton onClick={closeHandler}><Close/></IconButton>
            </Box>
            <DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5
            }}>
                <Stepper activeStep={stepper}>
                    <Step>
                        <StepLabel>Quelle est votre problème</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Décriver nous votre problème</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Récapitulatif</StepLabel>
                    </Step>
                </Stepper>
                <StepperContent id={stepper}/>
            </DialogContent>
        </>
    )
}