export const missionConfig = {
  missionName: "COMMAND AND CONTROL CENTER | BRIGADE HQ",
  missionSubtitle: "Satellite baseline / ISR fusion / Command interlock",
  theatre: "Desert Sector | Western front, India",
  commandNode: "Brigade Headquarter",
  gridReference: "SIM-GRID RJ-WD-42",
  confidenceScore: 94,
  confidenceThreshold: 90,
  decisionPolicy: "ROE CLEARENCE | HUMAN COMMAND",
  essentials: [
    { label: "TARGET LOCKED", status: "LOCKED", state: "green" },
    { label: "KAMIKAZE STRIKE", status: "AWAITING COMMAND", state: "red" },
    { label: "RULES OF ENGAGEMENT STATUS", status: "CLEARED", state: "green" },
    { label: "HUMAN REVIEW", status: "AWAITING COMMAND", state: "amber" }
  ],
  actionPanel: [
    { label: "STRIKE", status: "AWAITING COMMAND", state: "red" },
    { label: "CALL OUT", status: "BROADCAST", state: "amber" },
    { label: "RETURN HOME", status: "AVAILABLE", state: "blue" },
    { label: "ABORT", status: "SAFE MODE", state: "green" }
  ],
  assets: [
    { id: "ISR-01", name: "Pure ISR Drone", status: "TRACKING", x: 49, y: 60 },
    { id: "LOITER-02", name: "Loitering Drone", status: "STAND-BY", x: 70, y: 50 },
    { id: "KAMIKAZE-03", name: "Kamikaze Drone", status: "AWAITING COMMAND / STAND-BY", x: 66, y: 71 },
    { id: "BRIGADE-HQ", name: "Brigade HQ", status: "CONNECTION: LIVE | CONTROL: ACTIVE", x: 74, y: 63 }
  ],
  movingTargets: [
    { id: "PK-5140", label: "Primary object", className: "Simulated hostile object", confidence: 94, status: "LOCKED", risk: "HIGH", path: [{x:38,y:37},{x:42,y:48},{x:48,y:49},{x:54,y:49}], duration: 12 },
    { id: "OBJ-24", label: "Secondary movement", className: "Unidentified movement / observe", confidence: 71, status: "OBSERVE", risk: "MEDIUM", path: [{x:22,y:21},{x:17,y:39}], duration: 15 },
    { id: "UNOBJ-31", label: "Low confidence contact", className: "Thermal/noise anomaly", confidence: 48, status: "FILTER", risk: "LOW", path: [{x:18,y:54},{x:15,y:57},{x:12,y:60}], duration: 17 }
  ],
  fusionInputs: [
    { label: "ISR EO/IR", value: 96 },
    { label: "Satellite baseline", value: 94 },
    { label: "Ground sensor", value: 91 },
    { label: "HUMINT", value: 58 }
  ],
  missionPhases: [
    "Satellite baseline display loaded",
    "ISR feed overlays moving contacts",
    "Target lock status generated",
    "AI classification and filtering complete",
    "ROE and human-review interlocks checked",
    "HQ receives 94% confidence assessment",
    "strike call-out displayed:YES/NO",
    "ISR records event feed and return-home option"
  ],
  safetyRules: ["No real strike or drone-control logic", "No live coordinates or release parameters", "Human review remains mandatory"]
};