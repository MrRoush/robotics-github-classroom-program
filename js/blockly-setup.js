/**
 * Blockly Setup + Dobot Robot Blocks + VEX V5 Blocks
 * Configures Blockly with simplified, student-friendly robot commands.
 * Robots supported: Dobot Magician, Dobot AI Starter, Dobot Magician AI, VEX V5
 */
const BlocklySetup = (() => {

  let workspace = null;

  /* ---- Color palette for block categories ---- */
  const COLORS = {
    movement:  '#1e40af',
    gripper:   '#6d28d9',
    speed:     '#059669',
    io:        '#d97706',
    ai:        '#dc2626',
    sensor:    '#0d9488',
    conveyor:  '#7c3aed',
    control:   '#0891b2',
    math:      '#4f46e5',
    vex:       '#f59e0b',
    vexScreen: '#2563eb',
    vexEvents: '#16a34a',
  };

  /* ---- VEX V5 port dropdown helpers ---- */
  const VEX_SMART_PORTS = [
    ['PORT1','PORT1'],['PORT2','PORT2'],['PORT3','PORT3'],
    ['PORT4','PORT4'],['PORT5','PORT5'],['PORT6','PORT6'],
    ['PORT7','PORT7'],['PORT8','PORT8'],['PORT9','PORT9'],
    ['PORT10','PORT10'],['PORT11','PORT11'],['PORT12','PORT12'],
    ['PORT13','PORT13'],['PORT14','PORT14'],['PORT15','PORT15'],
    ['PORT16','PORT16'],['PORT17','PORT17'],['PORT18','PORT18'],
    ['PORT19','PORT19'],['PORT20','PORT20'],['PORT21','PORT21'],
  ];

  const VEX_THREE_WIRE_PORTS = [
    ['A','A'],['B','B'],['C','C'],['D','D'],
    ['E','E'],['F','F'],['G','G'],['H','H'],
  ];

  const VEX_COLORS = [
    ['Black','Color.BLACK'],['White','Color.WHITE'],
    ['Red','Color.RED'],['Green','Color.GREEN'],
    ['Blue','Color.BLUE'],['Yellow','Color.YELLOW'],
    ['Orange','Color.ORANGE'],['Purple','Color.PURPLE'],
    ['Cyan','Color.CYAN'],['Transparent','Color.TRANSPARENT'],
  ];

  /* ---- Register all custom Dobot blocks ---- */
  const defineBlocks = () => {

    // ── MOVEMENT BLOCKS ──────────────────────────────────────────────────

    Blockly.Blocks['dobot_move_home'] = {
      init() {
        this.appendDummyInput()
          .appendField('🏠 Move Robot to Home Position');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm back to its starting position.');
        this.setHelpUrl('');
      }
    };

    Blockly.Blocks['dobot_move_forward'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('⬆️ Move Forward');
        this.appendDummyInput().appendField('mm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm forward by the given distance in millimeters.');
      }
    };

    Blockly.Blocks['dobot_move_backward'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('⬇️ Move Backward');
        this.appendDummyInput().appendField('mm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm backward by the given distance in millimeters.');
      }
    };

    Blockly.Blocks['dobot_move_left'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('⬅️ Move Left');
        this.appendDummyInput().appendField('mm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm to the left by the given distance in millimeters.');
      }
    };

    Blockly.Blocks['dobot_move_right'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('➡️ Move Right');
        this.appendDummyInput().appendField('mm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm to the right by the given distance in millimeters.');
      }
    };

    Blockly.Blocks['dobot_move_up'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('🔼 Move Up');
        this.appendDummyInput().appendField('mm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm up by the given distance in millimeters.');
      }
    };

    Blockly.Blocks['dobot_move_down'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('🔽 Move Down');
        this.appendDummyInput().appendField('mm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm down by the given distance in millimeters.');
      }
    };

    Blockly.Blocks['dobot_rotate'] = {
      init() {
        this.appendValueInput('DEGREES')
          .setCheck('Number')
          .appendField('🔄 Rotate')
          .appendField(new Blockly.FieldDropdown([
            ['⬅️ Left', 'left'],
            ['➡️ Right', 'right'],
          ]), 'DIRECTION');
        this.appendDummyInput().appendField('degrees');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Rotate the robot arm left or right by the given number of degrees.');
      }
    };

    Blockly.Blocks['dobot_move_to_point'] = {
      init() {
        this.appendDummyInput().appendField('📍 Move to Position');
        this.appendValueInput('X').setCheck('Number').appendField('X:');
        this.appendValueInput('Y').setCheck('Number').appendField('Y:');
        this.appendValueInput('Z').setCheck('Number').appendField('Z:');
        this.appendValueInput('R').setCheck('Number').appendField('R:');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm to exact X, Y, Z coordinates with end-effector rotation R (degrees).');
      }
    };

    Blockly.Blocks['dobot_set_joint_angles'] = {
      init() {
        this.appendDummyInput().appendField('🔩 Set Joint Angles');
        this.appendValueInput('J1').setCheck('Number').appendField('J1:');
        this.appendValueInput('J2').setCheck('Number').appendField('J2:');
        this.appendValueInput('J3').setCheck('Number').appendField('J3:');
        this.appendValueInput('J4').setCheck('Number').appendField('J4:');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot by setting the four joint angles (degrees) directly.');
      }
    };

    Blockly.Blocks['dobot_move_delta'] = {
      init() {
        this.appendDummyInput().appendField('↗️ Move Delta');
        this.appendValueInput('DX').setCheck('Number').appendField('ΔX:');
        this.appendValueInput('DY').setCheck('Number').appendField('ΔY:');
        this.appendValueInput('DZ').setCheck('Number').appendField('ΔZ:');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move the robot arm relative to its current position by the given deltas.');
      }
    };

    Blockly.Blocks['dobot_get_position'] = {
      init() {
        this.appendDummyInput()
          .appendField('📐 Get Current Position');
        this.setOutput(true, 'String');
        this.setColour(COLORS.movement);
        this.setTooltip('Returns the current robot position as (x, y, z, r).');
      }
    };

    // ── GRIPPER / END EFFECTOR BLOCKS ───────────────────────────────────

    Blockly.Blocks['dobot_grab'] = {
      init() {
        this.appendDummyInput()
          .appendField('🟣 Grab Object (Suction ON)');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.gripper);
        this.setTooltip('Turn on the suction cup to grab an object.');
      }
    };

    Blockly.Blocks['dobot_release'] = {
      init() {
        this.appendDummyInput()
          .appendField('⚪ Release Object (Suction OFF)');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.gripper);
        this.setTooltip('Turn off the suction cup to release an object.');
      }
    };

    Blockly.Blocks['dobot_claw_open'] = {
      init() {
        this.appendDummyInput()
          .appendField('✋ Open Claw');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.gripper);
        this.setTooltip('Open the claw gripper.');
      }
    };

    Blockly.Blocks['dobot_claw_close'] = {
      init() {
        this.appendDummyInput()
          .appendField('✊ Close Claw');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.gripper);
        this.setTooltip('Close the claw gripper to hold an object.');
      }
    };

    // ── SPEED BLOCKS ─────────────────────────────────────────────────────

    Blockly.Blocks['dobot_set_speed'] = {
      init() {
        this.appendDummyInput()
          .appendField('⚡ Set Robot Speed to')
          .appendField(new Blockly.FieldDropdown([
            ['🐢 Slow',   'slow'],
            ['🚶 Medium', 'medium'],
            ['🚀 Fast',   'fast'],
          ]), 'SPEED');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.speed);
        this.setTooltip('Set the movement speed of the robot.');
      }
    };

    // ── I/O & WAIT BLOCKS ────────────────────────────────────────────────

    Blockly.Blocks['dobot_wait'] = {
      init() {
        this.appendValueInput('SECONDS')
          .setCheck('Number')
          .appendField('⏳ Wait');
        this.appendDummyInput().appendField('seconds');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Pause the robot for the given number of seconds.');
      }
    };

    Blockly.Blocks['dobot_beep'] = {
      init() {
        this.appendDummyInput().appendField('🔔 Beep');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Make the robot beep once.');
      }
    };

    Blockly.Blocks['dobot_print'] = {
      init() {
        this.appendValueInput('TEXT')
          .setCheck('String')
          .appendField('💬 Show Message:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Show a message in the output log.');
      }
    };

    Blockly.Blocks['dobot_light_on'] = {
      init() {
        this.appendDummyInput()
          .appendField('💡 Turn Light')
          .appendField(new Blockly.FieldDropdown([
            ['ON', 'on'],
            ['OFF', 'off'],
          ]), 'STATE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Turn the robot indicator light on or off.');
      }
    };

    // ── AI BLOCKS (Dobot AI Starter / AI Kit) ────────────────────────────

    Blockly.Blocks['dobot_ai_detect_object'] = {
      init() {
        this.appendDummyInput()
          .appendField('🤖 Detect Object (AI Camera)');
        this.setOutput(true, 'String');
        this.setColour(COLORS.ai);
        this.setTooltip('Use the AI camera to detect the nearest object. Returns the object name.');
      }
    };

    Blockly.Blocks['dobot_ai_follow_line'] = {
      init() {
        this.appendDummyInput().appendField('📏 Follow Line');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.ai);
        this.setTooltip('Activate line-following mode for the Dobot AI Starter.');
      }
    };

    Blockly.Blocks['dobot_ai_color_detect'] = {
      init() {
        this.appendDummyInput().appendField('🎨 Detected Color');
        this.setOutput(true, 'String');
        this.setColour(COLORS.ai);
        this.setTooltip('Returns the color detected by the AI camera (e.g., "red", "blue", "green").');
      }
    };

    Blockly.Blocks['dobot_ai_face_detect'] = {
      init() {
        this.appendDummyInput().appendField('😊 Face Detected?');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.ai);
        this.setTooltip('Returns true if the AI camera detects a face.');
      }
    };

    Blockly.Blocks['dobot_ai_grab_detected'] = {
      init() {
        this.appendDummyInput()
          .appendField('🤖 AI: Grab Detected Object');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.ai);
        this.setTooltip('Automatically move to and grab the object detected by AI camera.');
      }
    };

    // ── SENSOR BLOCKS ──────────────────────────────────────────────────────

    Blockly.Blocks['dobot_read_color_sensor'] = {
      init() {
        this.appendDummyInput()
          .appendField('🎨 Read Color Sensor on GP Port')
          .appendField(new Blockly.FieldDropdown([
            ['GP1','1'],['GP2','2'],['GP4','4'],['GP5','5'],
          ]), 'PORT');
        this.setOutput(true, 'String');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read the color sensor on the specified GP port. Returns the detected color (e.g., "red", "green", "blue").');
      }
    };

    Blockly.Blocks['dobot_read_infrared'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡 Read Infrared Sensor on GP Port')
          .appendField(new Blockly.FieldDropdown([
            ['GP1','1'],['GP2','2'],['GP4','4'],['GP5','5'],
          ]), 'PORT');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read the infrared sensor distance value (mm) on the specified GP port.');
      }
    };

    Blockly.Blocks['dobot_infrared_detected'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡 Infrared Object Detected? on GP Port')
          .appendField(new Blockly.FieldDropdown([
            ['GP1','1'],['GP2','2'],['GP4','4'],['GP5','5'],
          ]), 'PORT');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.sensor);
        this.setTooltip('Returns true if the infrared sensor on the specified GP port detects an object nearby.');
      }
    };

    // ── CONVEYOR BELT BLOCKS ─────────────────────────────────────────────

    Blockly.Blocks['dobot_conveyor_speed'] = {
      init() {
        this.appendValueInput('SPEED')
          .setCheck('Number')
          .appendField('🏭 Set Conveyor')
          .appendField(new Blockly.FieldDropdown([
            ['STEPPER1','1'],['STEPPER2','2'],
          ]), 'PORT')
          .appendField('Speed');
        this.appendDummyInput()
          .appendField('mm/s')
          .appendField(new Blockly.FieldDropdown([
            ['Forward', 'forward'],
            ['Backward', 'backward'],
          ]), 'DIRECTION')
          .appendField('on')
          .appendField(new Blockly.FieldDropdown([
            ['STEPPER1', '1'],
            ['STEPPER2', '2'],
          ]), 'PORT');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.conveyor);
        this.setTooltip('Set the conveyor belt speed and direction on the selected Stepper port.');
      }
    };

    Blockly.Blocks['dobot_conveyor_stop'] = {
      init() {
        this.appendDummyInput()
          .appendField('⏹️ Stop Conveyor Belt on')
          .appendField(new Blockly.FieldDropdown([
            ['STEPPER1', '1'],
            ['STEPPER2', '2'],
          ]), 'PORT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.conveyor);
        this.setTooltip('Stop the conveyor belt on the selected Stepper port.');
      }
    };

    Blockly.Blocks['dobot_conveyor_distance'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('🏭 Move Conveyor')
          .appendField(new Blockly.FieldDropdown([
            ['STEPPER1','1'],['STEPPER2','2'],
          ]), 'PORT');
        this.appendDummyInput()
          .appendField('mm')
          .appendField(new Blockly.FieldDropdown([
            ['Forward', 'forward'],
            ['Backward', 'backward'],
          ]), 'DIRECTION')
          .appendField('on')
          .appendField(new Blockly.FieldDropdown([
            ['STEPPER1', '1'],
            ['STEPPER2', '2'],
          ]), 'PORT');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.conveyor);
        this.setTooltip('Move the conveyor belt a specific distance on the selected Stepper port.');
      }
    };

    // ── DELTA R BLOCK (suction cup motor rotation) ──────────────────────

    Blockly.Blocks['dobot_move_delta_r'] = {
      init() {
        this.appendValueInput('DR')
          .setCheck('Number')
          .appendField('🔄 Rotate End Effector ΔR');
        this.appendDummyInput().appendField('degrees');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Rotate the suction cup / end effector by ΔR degrees (positive = counter-clockwise).');
      }
    };

    Blockly.Blocks['dobot_get_joint_angles'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔩 Get Joint Angles');
        this.setOutput(true, 'String');
        this.setColour(COLORS.movement);
        this.setTooltip('Returns the current joint angles as (J1, J2, J3, J4).');
      }
    };

    // ── DOBOT MAGICIAN SETTINGS BLOCKS ──────────────────────────────────

    Blockly.Blocks['dobot_set_end_effector'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔧 Set End Effector to')
          .appendField(new Blockly.FieldDropdown([
            ['Gripper', 'gripper'],
            ['Suction Cup', 'suction'],
            ['Pen', 'pen'],
          ]), 'EFFECTOR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.gripper);
        this.setTooltip('Select the end effector attached to the robot arm.');
      }
    };

    Blockly.Blocks['dobot_set_motion_ratio'] = {
      init() {
        this.appendDummyInput().appendField('⚡ Set Motion Ratio');
        this.appendValueInput('VELOCITY').setCheck('Number').appendField('Velocity');
        this.appendDummyInput().appendField('%');
        this.appendValueInput('ACCEL').setCheck('Number').appendField('Acceleration');
        this.appendDummyInput().appendField('%');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.speed);
        this.setTooltip('Set the motion velocity and acceleration as a percentage (0–100%).');
      }
    };

    Blockly.Blocks['dobot_set_joint_speed'] = {
      init() {
        this.appendDummyInput().appendField('⚡ Set Joint Speed');
        this.appendValueInput('VELOCITY').setCheck('Number').appendField('Velocity');
        this.appendDummyInput().appendField('°/s');
        this.appendValueInput('ACCEL').setCheck('Number').appendField('Acceleration');
        this.appendDummyInput().appendField('°/s²');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.speed);
        this.setTooltip('Set the joint movement velocity (degrees/s) and acceleration (degrees/s²).');
      }
    };

    Blockly.Blocks['dobot_set_xyz_speed'] = {
      init() {
        this.appendDummyInput().appendField('⚡ Set XYZ Speed');
        this.appendValueInput('VELOCITY').setCheck('Number').appendField('Velocity');
        this.appendDummyInput().appendField('mm/s');
        this.appendValueInput('ACCEL').setCheck('Number').appendField('Acceleration');
        this.appendDummyInput().appendField('mm/s²');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.speed);
        this.setTooltip('Set the Cartesian movement velocity (mm/s) and acceleration (mm/s²).');
      }
    };

    Blockly.Blocks['dobot_set_jump_height'] = {
      init() {
        this.appendDummyInput().appendField('📐 Set Jump Parameters');
        this.appendValueInput('HEIGHT').setCheck('Number').appendField('Jump Height');
        this.appendDummyInput().appendField('mm');
        this.appendValueInput('ZLIMIT').setCheck('Number').appendField('Z Limit');
        this.appendDummyInput().appendField('mm');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Set the jump height and maximum Z limit for Jump To movements (mm).');
      }
    };

    Blockly.Blocks['dobot_jump_to'] = {
      init() {
        this.appendDummyInput().appendField('🦘 Jump to Position');
        this.appendValueInput('X').setCheck('Number').appendField('X:');
        this.appendValueInput('Y').setCheck('Number').appendField('Y:');
        this.appendValueInput('Z').setCheck('Number').appendField('Z:');
        this.appendValueInput('R').setCheck('Number').appendField('R:');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Jump to a position: the arm lifts up, moves over, then descends to the target point.');
      }
    };

    Blockly.Blocks['dobot_go_to'] = {
      init() {
        this.appendDummyInput().appendField('📍 Go to Position');
        this.appendValueInput('X').setCheck('Number').appendField('X:');
        this.appendValueInput('Y').setCheck('Number').appendField('Y:');
        this.appendValueInput('Z').setCheck('Number').appendField('Z:');
        this.appendValueInput('R').setCheck('Number').appendField('R:');
        this.appendDummyInput()
          .appendField('Motion:')
          .appendField(new Blockly.FieldDropdown([
            ['Joint', 'joint'],
            ['Straight Line', 'linear'],
          ]), 'MODE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Move to a position using joint movement (fastest) or straight line (precise path).');
      }
    };

    Blockly.Blocks['dobot_set_r'] = {
      init() {
        this.appendValueInput('R')
          .setCheck('Number')
          .appendField('🔄 Set End Effector Rotation R');
        this.appendDummyInput().appendField('degrees');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Set the end effector rotation to a specific angle (degrees).');
      }
    };

    Blockly.Blocks['dobot_clear_alarm'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔔 Clear Alarm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#dc2626');
        this.setTooltip('Clear any active alarms on the Dobot robot.');
      }
    };

    Blockly.Blocks['dobot_set_stepper_speed'] = {
      init() {
        this.appendDummyInput()
          .appendField('⚙️ Set Stepper Motor')
          .appendField(new Blockly.FieldDropdown([
            ['STEPPER1','1'],['STEPPER2','2'],
          ]), 'PORT')
          .appendField('Speed');
        this.appendValueInput('SPEED').setCheck('Number');
        this.appendDummyInput().appendField('pulse/s');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.conveyor);
        this.setTooltip('Set continuous stepper motor speed in pulses per second.');
      }
    };

    Blockly.Blocks['dobot_set_stepper_pulses'] = {
      init() {
        this.appendDummyInput()
          .appendField('⚙️ Stepper Motor')
          .appendField(new Blockly.FieldDropdown([
            ['STEPPER1','1'],['STEPPER2','2'],
          ]), 'PORT');
        this.appendValueInput('SPEED').setCheck('Number').appendField('Speed');
        this.appendDummyInput().appendField('pulse/s for');
        this.appendValueInput('PULSES').setCheck('Number');
        this.appendDummyInput().appendField('pulses');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.conveyor);
        this.setTooltip('Run stepper motor at a speed for a specific number of pulses then stop.');
      }
    };

    Blockly.Blocks['dobot_lost_step_detect'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔍 Perform Lost Step Detection');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Perform a lost step detection to check if the robot motors have lost steps.');
      }
    };

    Blockly.Blocks['dobot_set_lost_step_threshold'] = {
      init() {
        this.appendValueInput('THRESHOLD')
          .setCheck('Number')
          .appendField('🔍 Set Lost Step Threshold');
        this.appendDummyInput().appendField('degrees');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Set the threshold (degrees) for lost step detection.');
      }
    };

    // ── PORT INITIALIZATION BLOCKS ─────────────────────────────────────

    Blockly.Blocks['dobot_init_color_sensor'] = {
      init() {
        this.appendDummyInput()
          .appendField('🎨 Init Color Sensor on GP Port')
          .appendField(new Blockly.FieldDropdown([
            ['GP1','1'],['GP2','2'],['GP4','4'],['GP5','5'],
          ]), 'PORT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Initialize the color sensor on the specified GP (General Purpose) port.');
      }
    };

    Blockly.Blocks['dobot_init_infrared'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡 Init Infrared Sensor on GP Port')
          .appendField(new Blockly.FieldDropdown([
            ['GP1','1'],['GP2','2'],['GP4','4'],['GP5','5'],
          ]), 'PORT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Initialize the infrared sensor on the specified GP (General Purpose) port.');
      }
    };

    Blockly.Blocks['dobot_init_conveyor'] = {
      init() {
        this.appendDummyInput()
          .appendField('🏭 Init Conveyor Belt on Stepper Port')
          .appendField(new Blockly.FieldDropdown([
            ['STEPPER1','1'],['STEPPER2','2'],
          ]), 'PORT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.conveyor);
        this.setTooltip('Initialize the conveyor belt on the specified Stepper motor port.');
      }
    };

    // ── EMERGENCY STOP BLOCK ───────────────────────────────────────────

    Blockly.Blocks['dobot_emergency_stop'] = {
      init() {
        this.appendDummyInput()
          .appendField('🛑 Emergency Stop');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#dc2626');
        this.setTooltip('Immediately stop all robot movement and disable motors.');
      }
    };

    // ── DOBOT CONTROL EVENT BLOCKS ─────────────────────────────────────

    Blockly.Blocks['dobot_when_started'] = {
      init() {
        this.appendDummyInput().appendField('🚩 When Program Started');
        this.appendStatementInput('DO');
        this.setColour(COLORS.control);
        this.setTooltip('Code inside runs when the program starts.');
      }
    };

    Blockly.Blocks['dobot_when_button'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔘 When')
          .appendField(new Blockly.FieldDropdown([
            ['Button A', 'A'],
            ['Button B', 'B'],
          ]), 'BUTTON')
          .appendField('Pressed');
        this.appendStatementInput('DO');
        this.setColour(COLORS.control);
        this.setTooltip('Run the enclosed code when the specified button is pressed.');
      }
    };

    Blockly.Blocks['dobot_broadcast'] = {
      init() {
        this.appendDummyInput()
          .appendField('📢 Broadcast Message')
          .appendField(new Blockly.FieldTextInput('message1'), 'MSG');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.control);
        this.setTooltip('Broadcast a named event message.');
      }
    };

    Blockly.Blocks['dobot_broadcast_wait'] = {
      init() {
        this.appendDummyInput()
          .appendField('📢 Broadcast Message')
          .appendField(new Blockly.FieldTextInput('message1'), 'MSG')
          .appendField('and Wait');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.control);
        this.setTooltip('Broadcast a named event message and wait for all listeners to finish.');
      }
    };

    Blockly.Blocks['dobot_when_receive'] = {
      init() {
        this.appendDummyInput()
          .appendField('📨 When I Receive')
          .appendField(new Blockly.FieldTextInput('message1'), 'MSG');
        this.appendStatementInput('DO');
        this.setColour(COLORS.control);
        this.setTooltip('Run the enclosed code when the named broadcast message is received.');
      }
    };

    Blockly.Blocks['dobot_wait_until'] = {
      init() {
        this.appendValueInput('COND').setCheck('Boolean').appendField('⏳ Wait Until');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.control);
        this.setTooltip('Pause the program until the condition becomes true.');
      }
    };

    Blockly.Blocks['dobot_stop'] = {
      init() {
        this.appendDummyInput().appendField('🛑 Stop Program');
        this.setPreviousStatement(true, null);
        this.setColour(COLORS.control);
        this.setTooltip('Stop the robot program immediately.');
      }
    };

    Blockly.Blocks['dobot_timer_reset'] = {
      init() {
        this.appendDummyInput().appendField('⏱️ Reset Timer');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.control);
        this.setTooltip('Reset the program timer to zero.');
      }
    };

    Blockly.Blocks['dobot_timer_value'] = {
      init() {
        this.appendDummyInput().appendField('⏱️ Timer (seconds)');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.control);
        this.setTooltip('Get the current timer value in seconds.');
      }
    };

    // ── AI STARTER DRIVE BLOCKS ────────────────────────────────────────

    Blockly.Blocks['ai_starter_drive_forward'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('🚗 Drive Forward');
        this.appendDummyInput().appendField('mm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Drive the AI Starter robot forward by the given distance.');
      }
    };

    Blockly.Blocks['ai_starter_drive_backward'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('🚗 Drive Backward');
        this.appendDummyInput().appendField('mm');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Drive the AI Starter robot backward by the given distance.');
      }
    };

    Blockly.Blocks['ai_starter_turn'] = {
      init() {
        this.appendValueInput('DEGREES')
          .setCheck('Number')
          .appendField('↩️ Turn')
          .appendField(new Blockly.FieldDropdown([
            ['Left', 'left'],
            ['Right', 'right'],
          ]), 'DIRECTION');
        this.appendDummyInput().appendField('degrees');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Turn the AI Starter robot left or right by the given angle.');
      }
    };

    Blockly.Blocks['ai_starter_stop'] = {
      init() {
        this.appendDummyInput()
          .appendField('⏹️ Stop Driving');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Stop the AI Starter robot wheels.');
      }
    };

    // ── SMARTBOT (AI STARTER) SPECIFIC BLOCKS ──────────────────────────

    Blockly.Blocks['smartbot_init'] = {
      init() {
        this.appendDummyInput().appendField('🤖 Initialize SmartBot');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Initialize the SmartBot (AI Starter) system.');
      }
    };

    Blockly.Blocks['smartbot_set_motor_speed'] = {
      init() {
        this.appendDummyInput()
          .appendField('🚗 Car')
          .appendField(new Blockly.FieldDropdown([
            ['Left', 'left'],
            ['Right', 'right'],
          ]), 'SIDE')
          .appendField('Motor Speed');
        this.appendValueInput('SPEED').setCheck('Number');
        this.appendDummyInput().appendField('rpm');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Set the speed (rpm) of the left or right wheel motor.');
      }
    };

    Blockly.Blocks['smartbot_set_motor_pid'] = {
      init() {
        this.appendDummyInput().appendField('⚙️ Set Motor PID');
        this.appendValueInput('KP').setCheck('Number').appendField('KP');
        this.appendValueInput('KI').setCheck('Number').appendField('KI');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.speed);
        this.setTooltip('Set the PID parameters (KP, KI) for the SmartBot motors.');
      }
    };

    Blockly.Blocks['smartbot_set_led'] = {
      init() {
        this.appendDummyInput()
          .appendField('💡 Set')
          .appendField(new Blockly.FieldDropdown([
            ['LED 1', '1'],
            ['LED 2', '2'],
          ]), 'LED')
          .appendField(new Blockly.FieldDropdown([
            ['ON', 'on'],
            ['OFF', 'off'],
            ['Blink', 'blink'],
          ]), 'STATE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Control an LED on the SmartBot (on, off, or blink).');
      }
    };

    Blockly.Blocks['smartbot_servo_attach'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔩 Attach Servo')
          .appendField(new Blockly.FieldDropdown([
            ['SERVO1', '1'],
            ['SERVO2', '2'],
          ]), 'PORT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Attach/enable the specified servo motor port.');
      }
    };

    Blockly.Blocks['smartbot_servo_set_angle'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔩 Set')
          .appendField(new Blockly.FieldDropdown([
            ['SERVO1', '1'],
            ['SERVO2', '2'],
          ]), 'PORT')
          .appendField('Angle');
        this.appendValueInput('ANGLE').setCheck('Number');
        this.appendDummyInput().appendField('degrees');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Set the servo motor angle (0–180 degrees).');
      }
    };

    Blockly.Blocks['smartbot_servo_detach'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔩 Detach Servo')
          .appendField(new Blockly.FieldDropdown([
            ['SERVO1', '1'],
            ['SERVO2', '2'],
          ]), 'PORT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.movement);
        this.setTooltip('Detach/disable the specified servo motor port.');
      }
    };

    Blockly.Blocks['smartbot_ultrasonic_start'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡 Start Ultrasonic')
          .appendField(new Blockly.FieldDropdown([
            ['Right Front', 'right_front'],
            ['Front', 'front'],
            ['Left Front', 'left_front'],
          ]), 'POSITION');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Start the ultrasonic sensor at the specified position.');
      }
    };

    Blockly.Blocks['smartbot_ultrasonic_detected'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡')
          .appendField(new Blockly.FieldDropdown([
            ['Right Front', 'right_front'],
            ['Front', 'front'],
            ['Left Front', 'left_front'],
          ]), 'POSITION')
          .appendField('Detected Barrier?');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.sensor);
        this.setTooltip('Returns true if the ultrasonic sensor detects a barrier.');
      }
    };

    Blockly.Blocks['smartbot_ultrasonic_data'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡')
          .appendField(new Blockly.FieldDropdown([
            ['Right Front', 'right_front'],
            ['Front', 'front'],
            ['Left Front', 'left_front'],
          ]), 'POSITION')
          .appendField('Ultrasonic Distance');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Returns the distance (mm) from the ultrasonic sensor.');
      }
    };

    Blockly.Blocks['smartbot_ir_data'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡 IR Sensor')
          .appendField(new Blockly.FieldDropdown([
            ['IR1','1'],['IR2','2'],['IR3','3'],
            ['IR4','4'],['IR5','5'],['IR6','6'],
          ]), 'SENSOR')
          .appendField('Data');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read the IR sensor value at the specified position.');
      }
    };

    Blockly.Blocks['smartbot_geomagnetic'] = {
      init() {
        this.appendDummyInput().appendField('🧭 Geomagnetic Angle');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Returns the geomagnetic (compass) heading angle in degrees.');
      }
    };

    Blockly.Blocks['smartbot_color_sensor_init'] = {
      init() {
        this.appendDummyInput()
          .appendField('🎨 Set')
          .appendField(new Blockly.FieldDropdown([
            ['Right', 'right'],
            ['Left', 'left'],
          ]), 'SIDE')
          .appendField('Color Sensor')
          .appendField(new Blockly.FieldDropdown([
            ['ON', 'on'],
            ['OFF', 'off'],
          ]), 'STATE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Turn the left or right color sensor on or off.');
      }
    };

    Blockly.Blocks['smartbot_color_sensor_data'] = {
      init() {
        this.appendDummyInput()
          .appendField('🎨 Get')
          .appendField(new Blockly.FieldDropdown([
            ['Right', 'right'],
            ['Left', 'left'],
          ]), 'SIDE')
          .appendField('Color Sensor')
          .appendField(new Blockly.FieldDropdown([
            ['Red', 'red'],
            ['Green', 'green'],
            ['Blue', 'blue'],
          ]), 'CHANNEL')
          .appendField('Data');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read the red, green, or blue value from the left or right color sensor.');
      }
    };

    Blockly.Blocks['smartbot_color_white_balance'] = {
      init() {
        this.appendDummyInput()
          .appendField('🎨 Set')
          .appendField(new Blockly.FieldDropdown([
            ['Right', 'right'],
            ['Left', 'left'],
          ]), 'SIDE')
          .appendField('Color White Balance');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Calibrate white balance for the left or right color sensor.');
      }
    };

    Blockly.Blocks['smartbot_switch_status'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔘')
          .appendField(new Blockly.FieldDropdown([
            ['Switch 1', '1'],
            ['Switch 2', '2'],
            ['Switch 3', '3'],
          ]), 'SWITCH')
          .appendField('Status');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.sensor);
        this.setTooltip('Returns the status of the specified switch (true = pressed).');
      }
    };

    Blockly.Blocks['smartbot_motor_encoder'] = {
      init() {
        this.appendDummyInput()
          .appendField('📐 Motor Encoder')
          .appendField(new Blockly.FieldDropdown([
            ['Right', 'right'],
            ['Left', 'left'],
          ]), 'SIDE')
          .appendField('Value');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read the motor encoder value for the left or right wheel.');
      }
    };

    Blockly.Blocks['smartbot_photoresistance'] = {
      init() {
        this.appendDummyInput().appendField('☀️ Photoresistance Value');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read the photoresistance (light level) sensor value.');
      }
    };

    Blockly.Blocks['smartbot_ultrasonic_threshold'] = {
      init() {
        this.appendValueInput('THRESHOLD')
          .setCheck('Number')
          .appendField('📡 Set Ultrasonic Threshold');
        this.appendDummyInput().appendField('mm');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Set the detection threshold distance (mm) for ultrasonic sensors.');
      }
    };

    Blockly.Blocks['smartbot_line_patrol_pid'] = {
      init() {
        this.appendDummyInput().appendField('📏 Set Line Patrol PID');
        this.appendValueInput('KP').setCheck('Number').appendField('KP');
        this.appendValueInput('KI').setCheck('Number').appendField('KI');
        this.appendValueInput('KD').setCheck('Number').appendField('KD');
        this.appendValueInput('ERROR_LIMIT').setCheck('Number').appendField('Error Limit');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.speed);
        this.setTooltip('Set PID parameters for line patrol: KP, KI, KD, and accumulated error limit.');
      }
    };

    // ── SMARTBOT SERIAL / I/O BLOCKS ───────────────────────────────────

    Blockly.Blocks['smartbot_set_port_mode'] = {
      init() {
        this.appendValueInput('PORT')
          .setCheck('Number')
          .appendField('🔌 Set Port');
        this.appendDummyInput()
          .appendField('Mode')
          .appendField(new Blockly.FieldDropdown([
            ['Output', 'output'],
            ['Input', 'input'],
          ]), 'MODE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Set a digital I/O port to input or output mode.');
      }
    };

    Blockly.Blocks['smartbot_digital_write'] = {
      init() {
        this.appendValueInput('PORT')
          .setCheck('Number')
          .appendField('🔌 Digital Port');
        this.appendDummyInput()
          .appendField('Level')
          .appendField(new Blockly.FieldDropdown([
            ['HIGH', 'high'],
            ['LOW', 'low'],
          ]), 'LEVEL');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Set a digital port output level to HIGH or LOW.');
      }
    };

    Blockly.Blocks['smartbot_analog_write'] = {
      init() {
        this.appendValueInput('PORT')
          .setCheck('Number')
          .appendField('🔌 Analog Port');
        this.appendValueInput('DUTY')
          .setCheck('Number')
          .appendField('Duty Cycle');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Output an analog (PWM) signal on a port with the given duty cycle (0–255).');
      }
    };

    Blockly.Blocks['smartbot_digital_read'] = {
      init() {
        this.appendValueInput('PORT')
          .setCheck('Number')
          .appendField('🔌 Get Digital Signal Port');
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(COLORS.io);
        this.setTooltip('Read the digital signal value from a port (0 or 1).');
      }
    };

    Blockly.Blocks['smartbot_analog_read'] = {
      init() {
        this.appendValueInput('PORT')
          .setCheck('Number')
          .appendField('🔌 Get Analog Signal Port');
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(COLORS.io);
        this.setTooltip('Read the analog signal value from a port (0–1023).');
      }
    };

    Blockly.Blocks['smartbot_set_servo_port'] = {
      init() {
        this.appendValueInput('PORT')
          .setCheck('Number')
          .appendField('🔩 Set Servo Port');
        this.appendValueInput('ANGLE')
          .setCheck('Number')
          .appendField('Angle');
        this.appendDummyInput().appendField('degrees');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Set the angle of a servo connected to a specific port.');
      }
    };

    Blockly.Blocks['smartbot_tone'] = {
      init() {
        this.appendValueInput('PORT')
          .setCheck('Number')
          .appendField('🔊 Sound Port');
        this.appendValueInput('FREQ')
          .setCheck('Number')
          .appendField('Frequency');
        this.appendDummyInput().appendField('Hz');
        this.appendValueInput('DURATION')
          .setCheck('Number')
          .appendField('Duration');
        this.appendDummyInput().appendField('ms');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Output a sound wave on a port at the given frequency and duration.');
      }
    };

    // ── SMARTBOT SERIAL BLOCKS ─────────────────────────────────────────

    Blockly.Blocks['smartbot_set_baud_rate'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡 Set Baud Rate')
          .appendField(new Blockly.FieldDropdown([
            ['9600', '9600'],
            ['115200', '115200'],
          ]), 'RATE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Set the serial communication baud rate.');
      }
    };

    Blockly.Blocks['smartbot_serial_print'] = {
      init() {
        this.appendValueInput('TEXT')
          .setCheck('String')
          .appendField('📡 Serial Print');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Print a message to the serial monitor.');
      }
    };

    Blockly.Blocks['smartbot_serial_println'] = {
      init() {
        this.appendValueInput('TEXT')
          .setCheck('String')
          .appendField('📡 Serial Print Line');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Print a message followed by a new line to the serial monitor.');
      }
    };

    Blockly.Blocks['smartbot_serial_read'] = {
      init() {
        this.appendDummyInput().appendField('📡 Get Serial Data');
        this.setOutput(true, 'String');
        this.setColour(COLORS.io);
        this.setTooltip('Read data from the serial buffer.');
      }
    };

    // ── AI SMART KIT BLOCKS ────────────────────────────────────────────

    Blockly.Blocks['smartkit_init'] = {
      init() {
        this.appendDummyInput().appendField('🧠 Initialize SmartKit');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.ai);
        this.setTooltip('Initialize the AI Smart Kit system and sensors.');
      }
    };

    Blockly.Blocks['smartkit_speech_init'] = {
      init() {
        this.appendDummyInput().appendField('🎤 Speech Recognition Init');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.ai);
        this.setTooltip('Initialize the speech recognition module.');
      }
    };

    Blockly.Blocks['smartkit_speech_add_phrase'] = {
      init() {
        this.appendValueInput('PHRASE')
          .setCheck('String')
          .appendField('🎤 Add Phrase to Slot');
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(
            Array.from({length: 20}, (_, i) => [String(i + 1), String(i + 1)])
          ), 'SLOT');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.ai);
        this.setTooltip('Add a phrase to a speech recognition slot (1–20).');
      }
    };

    Blockly.Blocks['smartkit_speech_detect'] = {
      init() {
        this.appendDummyInput()
          .appendField('🎤 Detect Phrase Slot')
          .appendField(new Blockly.FieldDropdown(
            Array.from({length: 20}, (_, i) => [String(i + 1), String(i + 1)])
          ), 'SLOT');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.ai);
        this.setTooltip('Returns true if the phrase in the specified slot was detected.');
      }
    };

    Blockly.Blocks['smartkit_joystick_button'] = {
      init() {
        this.appendDummyInput()
          .appendField('🕹️ Joystick')
          .appendField(new Blockly.FieldDropdown([
            ['Red', 'red'],
            ['Green', 'green'],
            ['Blue', 'blue'],
          ]), 'COLOR')
          .appendField('Button Pressed?');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.sensor);
        this.setTooltip('Check if the specified joystick button is pressed.');
      }
    };

    Blockly.Blocks['smartkit_joystick_led'] = {
      init() {
        this.appendDummyInput()
          .appendField('🕹️ Turn')
          .appendField(new Blockly.FieldDropdown([
            ['Red', 'red'],
            ['Green', 'green'],
            ['Blue', 'blue'],
          ]), 'COLOR')
          .appendField('LED')
          .appendField(new Blockly.FieldDropdown([
            ['ON', 'on'],
            ['OFF', 'off'],
          ]), 'STATE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.sensor);
        this.setTooltip('Turn a joystick LED on or off.');
      }
    };

    Blockly.Blocks['smartkit_joystick_value'] = {
      init() {
        this.appendDummyInput()
          .appendField('🕹️ Joystick')
          .appendField(new Blockly.FieldDropdown([
            ['X', 'x'],
            ['Y', 'y'],
          ]), 'AXIS')
          .appendField('Value');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read the joystick position on the X or Y axis.');
      }
    };

    Blockly.Blocks['smartkit_joystick_press'] = {
      init() {
        this.appendDummyInput().appendField('🕹️ Joystick Press State');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.sensor);
        this.setTooltip('Check if the joystick is being pressed down.');
      }
    };

    Blockly.Blocks['smartkit_get_digital'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔌 Get Digital Signal')
          .appendField(new Blockly.FieldDropdown([
            ['EIO1','1'],['EIO2','2'],['EIO3','3'],['EIO4','4'],['EIO5','5'],
            ['EIO6','6'],['EIO7','7'],['EIO8','8'],['EIO9','9'],['EIO10','10'],
            ['EIO11','11'],['EIO12','12'],['EIO13','13'],['EIO14','14'],['EIO15','15'],
            ['EIO16','16'],['EIO17','17'],['EIO18','18'],['EIO19','19'],['EIO20','20'],
          ]), 'PORT');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.io);
        this.setTooltip('Read the digital signal value from an EIO port (1–20).');
      }
    };

    // ── VEX V5 BLOCKS ─────────────────────────────────────────────────

    Blockly.Blocks['vex_drive_forward'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('🚗 VEX Drive Forward');
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ['inches', 'INCHES'],
            ['mm', 'MM'],
            ['cm', 'CM'],
          ]), 'UNITS');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Drive the VEX V5 robot forward by the given distance.');
      }
    };

    Blockly.Blocks['vex_drive_backward'] = {
      init() {
        this.appendValueInput('DISTANCE')
          .setCheck('Number')
          .appendField('🚗 VEX Drive Backward');
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ['inches', 'INCHES'],
            ['mm', 'MM'],
            ['cm', 'CM'],
          ]), 'UNITS');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Drive the VEX V5 robot backward by the given distance.');
      }
    };

    Blockly.Blocks['vex_turn'] = {
      init() {
        this.appendValueInput('DEGREES')
          .setCheck('Number')
          .appendField('↩️ VEX Turn')
          .appendField(new Blockly.FieldDropdown([
            ['Left', 'LEFT'],
            ['Right', 'RIGHT'],
          ]), 'DIRECTION');
        this.appendDummyInput().appendField('degrees');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Turn the VEX V5 robot left or right by the given angle.');
      }
    };

    Blockly.Blocks['vex_drive_stop'] = {
      init() {
        this.appendDummyInput()
          .appendField('⏹️ VEX Stop')
          .appendField(new Blockly.FieldDropdown([
            ['Brake', 'BRAKE'],
            ['Coast', 'COAST'],
            ['Hold', 'HOLD'],
          ]), 'MODE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Stop the VEX V5 drivetrain using Brake, Coast, or Hold mode.');
      }
    };

    Blockly.Blocks['vex_drive_speed'] = {
      init() {
        this.appendValueInput('SPEED')
          .setCheck('Number')
          .appendField('⚡ VEX Set Drive Speed');
        this.appendDummyInput().appendField('%');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Set the VEX V5 drivetrain speed (0–100%).');
      }
    };

    Blockly.Blocks['vex_motor_spin'] = {
      init() {
        this.appendDummyInput()
          .appendField('⚙️ VEX Motor')
          .appendField(new Blockly.FieldDropdown(VEX_SMART_PORTS), 'PORT')
          .appendField('Spin')
          .appendField(new Blockly.FieldDropdown([
            ['Forward', 'FORWARD'],
            ['Reverse', 'REVERSE'],
          ]), 'DIRECTION');
        this.appendValueInput('SPEED')
          .setCheck('Number')
          .appendField('at');
        this.appendDummyInput().appendField('% speed');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Spin a VEX V5 motor on the selected port at the given speed and direction.');
      }
    };

    Blockly.Blocks['vex_motor_stop'] = {
      init() {
        this.appendDummyInput()
          .appendField('⏹️ VEX Motor')
          .appendField(new Blockly.FieldDropdown(VEX_SMART_PORTS), 'PORT')
          .appendField('Stop')
          .appendField(new Blockly.FieldDropdown([
            ['Brake', 'BRAKE'],
            ['Coast', 'COAST'],
            ['Hold', 'HOLD'],
          ]), 'MODE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Stop a VEX V5 motor on the selected port.');
      }
    };

    Blockly.Blocks['vex_motor_spin_for'] = {
      init() {
        this.appendDummyInput()
          .appendField('⚙️ VEX Motor')
          .appendField(new Blockly.FieldDropdown(VEX_SMART_PORTS), 'PORT')
          .appendField('Spin')
          .appendField(new Blockly.FieldDropdown([
            ['Forward', 'FORWARD'],
            ['Reverse', 'REVERSE'],
          ]), 'DIRECTION');
        this.appendValueInput('AMOUNT')
          .setCheck('Number')
          .appendField('for');
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ['degrees', 'DEGREES'],
            ['revolutions', 'TURNS'],
            ['seconds', 'SECONDS'],
          ]), 'UNITS');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Spin a VEX V5 motor for a specific amount of degrees, revolutions, or seconds.');
      }
    };

    Blockly.Blocks['vex_sensor_distance'] = {
      init() {
        this.appendDummyInput()
          .appendField('📏 VEX Distance Sensor')
          .appendField(new Blockly.FieldDropdown(VEX_SMART_PORTS), 'PORT');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.vex);
        this.setTooltip('Read the distance value (mm) from the VEX V5 Distance Sensor on the selected port.');
      }
    };

    Blockly.Blocks['vex_sensor_color'] = {
      init() {
        this.appendDummyInput()
          .appendField('🎨 VEX Color Sensor')
          .appendField(new Blockly.FieldDropdown(VEX_SMART_PORTS), 'PORT');
        this.setOutput(true, 'String');
        this.setColour(COLORS.vex);
        this.setTooltip('Read the detected color from the VEX V5 Color Sensor on the selected port.');
      }
    };

    Blockly.Blocks['vex_sensor_bumper'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔘 VEX Bumper Switch')
          .appendField(new Blockly.FieldDropdown(VEX_THREE_WIRE_PORTS), 'PORT')
          .appendField('pressed?');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.vex);
        this.setTooltip('Returns True if the VEX V5 Bumper Switch on the selected 3-wire port is pressed.');
      }
    };

    Blockly.Blocks['vex_sensor_gyro'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔄 VEX Gyro Heading')
          .appendField(new Blockly.FieldDropdown(VEX_SMART_PORTS), 'PORT');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.vex);
        this.setTooltip('Read the current heading (0–360°) from the VEX V5 Gyro/Inertial Sensor on the selected port.');
      }
    };

    Blockly.Blocks['vex_wait'] = {
      init() {
        this.appendValueInput('MSEC')
          .setCheck('Number')
          .appendField('⏱️ VEX Wait');
        this.appendDummyInput().appendField('msec');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Pause the VEX program for the given number of milliseconds.');
      }
    };

    Blockly.Blocks['vex_print'] = {
      init() {
        this.appendValueInput('TEXT')
          .setCheck('String')
          .appendField('🖨️ VEX Brain Print');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vex);
        this.setTooltip('Print a message on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_controller_button'] = {
      init() {
        this.appendDummyInput()
          .appendField('🎮 VEX Controller Button')
          .appendField(new Blockly.FieldDropdown([
            ['A','ButtonA'],['B','ButtonB'],['X','ButtonX'],['Y','ButtonY'],
            ['Up','ButtonUp'],['Down','ButtonDown'],
            ['Left','ButtonLeft'],['Right','ButtonRight'],
            ['L1','ButtonL1'],['L2','ButtonL2'],
            ['R1','ButtonR1'],['R2','ButtonR2'],
          ]), 'BUTTON')
          .appendField('pressed?');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.vex);
        this.setTooltip('Returns True if the selected VEX V5 Controller button is currently pressed.');
      }
    };

    Blockly.Blocks['vex_controller_axis'] = {
      init() {
        this.appendDummyInput()
          .appendField('🕹️ VEX Controller Axis')
          .appendField(new Blockly.FieldDropdown([
            ['Axis1 (Right X)', 'Axis1'],
            ['Axis2 (Right Y)', 'Axis2'],
            ['Axis3 (Left Y)', 'Axis3'],
            ['Axis4 (Left X)', 'Axis4'],
          ]), 'AXIS');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.vex);
        this.setTooltip('Read the position (-100 to 100) of a VEX V5 Controller joystick axis.');
      }
    };

    // ── VEX V5 SCREEN BLOCKS ───────────────────────────────────────────

    Blockly.Blocks['vex_screen_set_cursor'] = {
      init() {
        this.appendValueInput('ROW').setCheck('Number').appendField('🖥️ Set Cursor Row');
        this.appendValueInput('COL').setCheck('Number').appendField('Column');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Set the cursor position on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_next_row'] = {
      init() {
        this.appendDummyInput().appendField('🖥️ Next Row on Screen');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Move the cursor to the next row on the Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_clear'] = {
      init() {
        this.appendDummyInput().appendField('🖥️ Clear Screen');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Clear the entire VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_clear_row'] = {
      init() {
        this.appendValueInput('ROW').setCheck('Number').appendField('🖥️ Clear Row');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Clear a specific row on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_set_font'] = {
      init() {
        this.appendDummyInput()
          .appendField('🖥️ Set Font')
          .appendField(new Blockly.FieldDropdown([
            ['Mono 12','FontType.MONO12'],['Mono 15','FontType.MONO15'],
            ['Mono 20','FontType.MONO20'],['Mono 30','FontType.MONO30'],
            ['Mono 40','FontType.MONO40'],['Mono 60','FontType.MONO60'],
            ['Prop 20','FontType.PROP20'],['Prop 30','FontType.PROP30'],
            ['Prop 40','FontType.PROP40'],['Prop 60','FontType.PROP60'],
          ]), 'FONT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Set the font for text on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_set_pen_color'] = {
      init() {
        this.appendDummyInput()
          .appendField('🖥️ Set Pen Color')
          .appendField(new Blockly.FieldDropdown(VEX_COLORS), 'COLOR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Set the pen (outline/text) color on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_set_fill_color'] = {
      init() {
        this.appendDummyInput()
          .appendField('🖥️ Set Fill Color')
          .appendField(new Blockly.FieldDropdown(VEX_COLORS), 'COLOR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Set the fill color for shapes on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_set_pen_width'] = {
      init() {
        this.appendValueInput('WIDTH').setCheck('Number').appendField('🖥️ Set Pen Width');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Set the pen width for drawing on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_draw_pixel'] = {
      init() {
        this.appendValueInput('X').setCheck('Number').appendField('🖥️ Draw Pixel X');
        this.appendValueInput('Y').setCheck('Number').appendField('Y');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Draw a single pixel at (x, y) on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_draw_line'] = {
      init() {
        this.appendValueInput('X1').setCheck('Number').appendField('🖥️ Draw Line X1');
        this.appendValueInput('Y1').setCheck('Number').appendField('Y1');
        this.appendValueInput('X2').setCheck('Number').appendField('X2');
        this.appendValueInput('Y2').setCheck('Number').appendField('Y2');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Draw a line from (x1,y1) to (x2,y2) on the VEX V5 Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_draw_rect'] = {
      init() {
        this.appendValueInput('X').setCheck('Number').appendField('🖥️ Draw Rect X');
        this.appendValueInput('Y').setCheck('Number').appendField('Y');
        this.appendValueInput('W').setCheck('Number').appendField('W');
        this.appendValueInput('H').setCheck('Number').appendField('H');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Draw a rectangle at (x, y) with the given width and height on the Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_draw_circle'] = {
      init() {
        this.appendValueInput('X').setCheck('Number').appendField('🖥️ Draw Circle X');
        this.appendValueInput('Y').setCheck('Number').appendField('Y');
        this.appendValueInput('R').setCheck('Number').appendField('Radius');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Draw a circle at (x, y) with the given radius on the Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_pressing'] = {
      init() {
        this.appendDummyInput().appendField('🖥️ Screen Pressed?');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Returns True if the VEX V5 Brain touch screen is currently being pressed.');
      }
    };

    Blockly.Blocks['vex_screen_x_position'] = {
      init() {
        this.appendDummyInput().appendField('🖥️ Screen X Position');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Returns the X coordinate of the last touch on the Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_y_position'] = {
      init() {
        this.appendDummyInput().appendField('🖥️ Screen Y Position');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Returns the Y coordinate of the last touch on the Brain screen.');
      }
    };

    Blockly.Blocks['vex_screen_set_precision'] = {
      init() {
        this.appendDummyInput()
          .appendField('🖥️ Set Print Precision')
          .appendField(new Blockly.FieldDropdown([
            ['0','0'],['1','1'],['2','2'],['3','3'],['4','4'],['5','5'],
          ]), 'DIGITS');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Set the number of decimal places shown when printing numbers on the Brain screen.');
      }
    };

    // ── VEX V5 SENSING / BRAIN BLOCKS ──────────────────────────────────

    Blockly.Blocks['vex_brain_battery'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔋 Battery')
          .appendField(new Blockly.FieldDropdown([
            ['Voltage (volts)', 'voltage'],
            ['Current (amps)', 'current'],
            ['Capacity (%)', 'capacity'],
          ]), 'PROP');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read a VEX V5 Brain battery property.');
      }
    };

    Blockly.Blocks['vex_sensor_range_found'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡 Range Finder')
          .appendField(new Blockly.FieldDropdown(VEX_THREE_WIRE_PORTS), 'PORT')
          .appendField('found object?');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORS.sensor);
        this.setTooltip('Returns True if the 3-wire Range Finder (sonar) detects an object.');
      }
    };

    Blockly.Blocks['vex_sensor_range_distance'] = {
      init() {
        this.appendDummyInput()
          .appendField('📡 Range Finder')
          .appendField(new Blockly.FieldDropdown(VEX_THREE_WIRE_PORTS), 'PORT')
          .appendField('distance')
          .appendField(new Blockly.FieldDropdown([['mm','MM'],['inches','INCHES']]), 'UNITS');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.sensor);
        this.setTooltip('Read distance from the 3-wire Range Finder (sonar sensor).');
      }
    };

    // ── VEX V5 CONSOLE BLOCKS ──────────────────────────────────────────

    Blockly.Blocks['vex_console_print'] = {
      init() {
        this.appendValueInput('TEXT')
          .setCheck('String')
          .appendField('📋 Console Print');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Print a message to the console / terminal output.');
      }
    };

    Blockly.Blocks['vex_console_clear'] = {
      init() {
        this.appendDummyInput().appendField('📋 Clear Console');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.io);
        this.setTooltip('Clear all rows on the console / terminal output.');
      }
    };

    // ── VEX V5 TIMER BLOCKS ───────────────────────────────────────────

    Blockly.Blocks['vex_timer_reset'] = {
      init() {
        this.appendDummyInput().appendField('⏱️ Reset Timer');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.control);
        this.setTooltip('Reset the VEX V5 Brain timer to zero.');
      }
    };

    Blockly.Blocks['vex_timer_value'] = {
      init() {
        this.appendDummyInput()
          .appendField('⏱️ Timer')
          .appendField(new Blockly.FieldDropdown([
            ['seconds', 'SECONDS'],
            ['milliseconds', 'MSEC'],
          ]), 'UNITS');
        this.setOutput(true, 'Number');
        this.setColour(COLORS.control);
        this.setTooltip('Get the current VEX V5 Brain timer value.');
      }
    };

    // ── VEX V5 EVENT BLOCKS ────────────────────────────────────────────

    Blockly.Blocks['vex_event_started'] = {
      init() {
        this.appendDummyInput().appendField('🚩 When Started');
        this.appendStatementInput('DO');
        this.setColour(COLORS.vexEvents);
        this.setTooltip('Code inside runs when the program starts.');
      }
    };

    Blockly.Blocks['vex_event_autonomous'] = {
      init() {
        this.appendDummyInput().appendField('🤖 When Autonomous');
        this.appendStatementInput('DO');
        this.setColour(COLORS.vexEvents);
        this.setTooltip('Code inside runs during the Autonomous period of a VEX competition.');
      }
    };

    Blockly.Blocks['vex_event_driver'] = {
      init() {
        this.appendDummyInput().appendField('🎮 When Driver Control');
        this.appendStatementInput('DO');
        this.setColour(COLORS.vexEvents);
        this.setTooltip('Code inside runs during the Driver Control period of a VEX competition.');
      }
    };

    Blockly.Blocks['vex_event_broadcast'] = {
      init() {
        this.appendDummyInput()
          .appendField('📢 Broadcast')
          .appendField(new Blockly.FieldTextInput('message1'), 'MSG');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexEvents);
        this.setTooltip('Broadcast a named event message.');
      }
    };

    Blockly.Blocks['vex_event_broadcast_wait'] = {
      init() {
        this.appendDummyInput()
          .appendField('📢 Broadcast')
          .appendField(new Blockly.FieldTextInput('message1'), 'MSG')
          .appendField('and wait');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.vexEvents);
        this.setTooltip('Broadcast a named event message and wait for all listeners to finish.');
      }
    };

    Blockly.Blocks['vex_event_receive'] = {
      init() {
        this.appendDummyInput()
          .appendField('📨 When I Receive')
          .appendField(new Blockly.FieldTextInput('message1'), 'MSG');
        this.appendStatementInput('DO');
        this.setColour(COLORS.vexEvents);
        this.setTooltip('Runs the enclosed code when the named broadcast message is received.');
      }
    };

    Blockly.Blocks['vex_screen_event'] = {
      init() {
        this.appendDummyInput()
          .appendField('🖥️ When Screen')
          .appendField(new Blockly.FieldDropdown([
            ['pressed','PRESSED'],['released','RELEASED'],
          ]), 'ACTION');
        this.appendStatementInput('DO');
        this.setColour(COLORS.vexScreen);
        this.setTooltip('Runs the enclosed code when the Brain screen is pressed or released.');
      }
    };

    Blockly.Blocks['vex_bumper_event'] = {
      init() {
        this.appendDummyInput()
          .appendField('🔘 When Bumper')
          .appendField(new Blockly.FieldDropdown(VEX_THREE_WIRE_PORTS), 'PORT')
          .appendField(new Blockly.FieldDropdown([
            ['pressed','PRESSED'],['released','RELEASED'],
          ]), 'ACTION');
        this.appendStatementInput('DO');
        this.setColour(COLORS.sensor);
        this.setTooltip('Runs the enclosed code when the Bumper Switch is pressed or released.');
      }
    };

    Blockly.Blocks['vex_wait_until'] = {
      init() {
        this.appendValueInput('COND').setCheck('Boolean').appendField('⏳ Wait Until');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORS.control);
        this.setTooltip('Pause the program until the condition becomes true.');
      }
    };

    Blockly.Blocks['vex_stop_project'] = {
      init() {
        this.appendDummyInput().appendField('🛑 Stop Project');
        this.setPreviousStatement(true, null);
        this.setColour(COLORS.control);
        this.setTooltip('Stop the VEX V5 program immediately.');
      }
    };

    Blockly.Blocks['vex_comment'] = {
      init() {
        this.appendDummyInput()
          .appendField('💬')
          .appendField(new Blockly.FieldTextInput('Write a comment here...'), 'TEXT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#94a3b8');
        this.setTooltip('A comment block — this text is not executed as code.');
      }
    };

  };  // end defineBlocks


  /* ---- Python code generators for each block ---- */
  const defineGenerators = () => {
    if (typeof Blockly.Python === 'undefined') return;
    const P = Blockly.Python;

    P['dobot_move_home']     = () => 'robot.move_home()\n';
    P['dobot_move_forward']  = (b) => `robot.move_forward(${P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 10})\n`;
    P['dobot_move_backward'] = (b) => `robot.move_backward(${P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 10})\n`;
    P['dobot_move_left']     = (b) => `robot.move_left(${P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 10})\n`;
    P['dobot_move_right']    = (b) => `robot.move_right(${P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 10})\n`;
    P['dobot_move_up']       = (b) => `robot.move_up(${P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 10})\n`;
    P['dobot_move_down']     = (b) => `robot.move_down(${P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 10})\n`;
    P['dobot_rotate']        = (b) => {
      const dir = b.getFieldValue('DIRECTION');
      const deg = P.valueToCode(b, 'DEGREES', P.ORDER_NONE) || 45;
      return `robot.rotate_${dir}(${deg})\n`;
    };
    P['dobot_move_to_point'] = (b) => {
      const x = P.valueToCode(b, 'X', P.ORDER_NONE) || 0;
      const y = P.valueToCode(b, 'Y', P.ORDER_NONE) || 0;
      const z = P.valueToCode(b, 'Z', P.ORDER_NONE) || 0;
      const r = P.valueToCode(b, 'R', P.ORDER_NONE) || 0;
      return `robot.move_to(${x}, ${y}, ${z}, ${r})\n`;
    };
    P['dobot_set_joint_angles'] = (b) => {
      const j1 = P.valueToCode(b, 'J1', P.ORDER_NONE) || 0;
      const j2 = P.valueToCode(b, 'J2', P.ORDER_NONE) || 0;
      const j3 = P.valueToCode(b, 'J3', P.ORDER_NONE) || 0;
      const j4 = P.valueToCode(b, 'J4', P.ORDER_NONE) || 0;
      return `robot.set_joint_angles(${j1}, ${j2}, ${j3}, ${j4})\n`;
    };
    P['dobot_move_delta'] = (b) => {
      const dx = P.valueToCode(b, 'DX', P.ORDER_NONE) || 0;
      const dy = P.valueToCode(b, 'DY', P.ORDER_NONE) || 0;
      const dz = P.valueToCode(b, 'DZ', P.ORDER_NONE) || 0;
      return `robot.move_delta(${dx}, ${dy}, ${dz})\n`;
    };
    P['dobot_get_position']  = () => ['robot.get_position()', P.ORDER_FUNCTION_CALL];
    P['dobot_grab']          = () => 'robot.grab()\n';
    P['dobot_release']       = () => 'robot.release()\n';
    P['dobot_claw_open']     = () => 'robot.claw_open()\n';
    P['dobot_claw_close']    = () => 'robot.claw_close()\n';
    P['dobot_set_speed']     = (b) => `robot.set_speed('${b.getFieldValue('SPEED')}')\n`;
    P['dobot_wait']          = (b) => `time.sleep(${P.valueToCode(b, 'SECONDS', P.ORDER_NONE) || 1})\n`;
    P['dobot_beep']          = () => 'robot.beep()\n';
    P['dobot_print']         = (b) => `print(${P.valueToCode(b, 'TEXT', P.ORDER_NONE) || '""'})\n`;
    P['dobot_light_on']      = (b) => `robot.light('${b.getFieldValue('STATE')}')\n`;
    P['dobot_ai_detect_object'] = () => ['robot.ai_detect_object()', P.ORDER_FUNCTION_CALL];
    P['dobot_ai_follow_line']= () => 'robot.ai_follow_line()\n';
    P['dobot_ai_color_detect']= () => ['robot.ai_detect_color()', P.ORDER_FUNCTION_CALL];
    P['dobot_ai_face_detect'] = () => ['robot.ai_detect_face()', P.ORDER_FUNCTION_CALL];
    P['dobot_ai_grab_detected'] = () => 'robot.ai_grab_detected()\n';
    P['dobot_read_color_sensor'] = (b) => {
      const port = b.getFieldValue('PORT') || 1;
      return [`robot.read_color_sensor()  # GP${port} (init first with robot.init_color_sensor(${port}))`, P.ORDER_FUNCTION_CALL];
    };
    P['dobot_read_infrared']     = (b) => {
      const port = b.getFieldValue('PORT') || 1;
      return [`robot.read_infrared()  # GP${port} (init first with robot.init_infrared(${port}))`, P.ORDER_FUNCTION_CALL];
    };
    P['dobot_infrared_detected'] = (b) => {
      const port = b.getFieldValue('PORT') || 1;
      return [`robot.infrared_detected()  # GP${port} (init first with robot.init_infrared(${port}))`, P.ORDER_FUNCTION_CALL];
    };
    P['dobot_conveyor_speed']    = (b) => {
      const speed = P.valueToCode(b, 'SPEED', P.ORDER_NONE) || 50;
      const dir = b.getFieldValue('DIRECTION');
      const port = b.getFieldValue('PORT') || '1';
      return `robot.conveyor_speed(${speed}, '${dir}', port=${port})\n`;
    };
    P['dobot_conveyor_stop']     = (b) => {
      const port = b.getFieldValue('PORT') || '1';
      return `robot.conveyor_stop(port=${port})\n`;
    };
    P['dobot_conveyor_distance'] = (b) => {
      const dist = P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 100;
      const dir = b.getFieldValue('DIRECTION');
      const port = b.getFieldValue('PORT') || '1';
      return `robot.conveyor_move(${dist}, '${dir}', port=${port})\n`;
    };
    P['dobot_move_delta_r']  = (b) => {
      const dr = P.valueToCode(b, 'DR', P.ORDER_NONE) || 0;
      return `robot.move_delta_r(${dr})\n`;
    };
    P['dobot_get_joint_angles'] = () => ['robot.get_joint_angles()', P.ORDER_FUNCTION_CALL];
    P['dobot_init_color_sensor'] = (b) => `robot.init_color_sensor(${b.getFieldValue('PORT')})\n`;
    P['dobot_init_infrared']     = (b) => `robot.init_infrared(${b.getFieldValue('PORT')})\n`;
    P['dobot_init_conveyor']     = (b) => `robot.init_conveyor(${b.getFieldValue('PORT')})\n`;
    P['dobot_emergency_stop']    = () => 'robot.emergency_stop()\n';
    P['ai_starter_drive_forward']  = (b) => `robot.drive_forward(${P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 100})\n`;
    P['ai_starter_drive_backward'] = (b) => `robot.drive_backward(${P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 100})\n`;
    P['ai_starter_turn'] = (b) => {
      const dir = b.getFieldValue('DIRECTION');
      const deg = P.valueToCode(b, 'DEGREES', P.ORDER_NONE) || 90;
      return `robot.turn_${dir}(${deg})\n`;
    };
    P['ai_starter_stop'] = () => 'robot.stop_driving()\n';

    // ── Dobot Magician settings generators ──────────────────────────────
    P['dobot_set_end_effector'] = (b) => `robot.set_end_effector('${b.getFieldValue('EFFECTOR')}')\n`;
    P['dobot_set_motion_ratio'] = (b) => {
      const vel = P.valueToCode(b, 'VELOCITY', P.ORDER_NONE) || 50;
      const acc = P.valueToCode(b, 'ACCEL', P.ORDER_NONE) || 50;
      return `robot.set_motion_ratio(${vel}, ${acc})\n`;
    };
    P['dobot_set_joint_speed'] = (b) => {
      const vel = P.valueToCode(b, 'VELOCITY', P.ORDER_NONE) || 50;
      const acc = P.valueToCode(b, 'ACCEL', P.ORDER_NONE) || 50;
      return `robot.set_joint_speed(${vel}, ${acc})\n`;
    };
    P['dobot_set_xyz_speed'] = (b) => {
      const vel = P.valueToCode(b, 'VELOCITY', P.ORDER_NONE) || 100;
      const acc = P.valueToCode(b, 'ACCEL', P.ORDER_NONE) || 100;
      return `robot.set_xyz_speed(${vel}, ${acc})\n`;
    };
    P['dobot_set_jump_height'] = (b) => {
      const h = P.valueToCode(b, 'HEIGHT', P.ORDER_NONE) || 20;
      const z = P.valueToCode(b, 'ZLIMIT', P.ORDER_NONE) || 150;
      return `robot.set_jump_params(${h}, ${z})\n`;
    };
    P['dobot_jump_to'] = (b) => {
      const x = P.valueToCode(b, 'X', P.ORDER_NONE) || 0;
      const y = P.valueToCode(b, 'Y', P.ORDER_NONE) || 0;
      const z = P.valueToCode(b, 'Z', P.ORDER_NONE) || 0;
      const r = P.valueToCode(b, 'R', P.ORDER_NONE) || 0;
      return `robot.jump_to(${x}, ${y}, ${z}, ${r})\n`;
    };
    P['dobot_go_to'] = (b) => {
      const x = P.valueToCode(b, 'X', P.ORDER_NONE) || 0;
      const y = P.valueToCode(b, 'Y', P.ORDER_NONE) || 0;
      const z = P.valueToCode(b, 'Z', P.ORDER_NONE) || 0;
      const r = P.valueToCode(b, 'R', P.ORDER_NONE) || 0;
      const mode = b.getFieldValue('MODE');
      return `robot.go_to(${x}, ${y}, ${z}, ${r}, mode='${mode}')\n`;
    };
    P['dobot_set_r'] = (b) => {
      const r = P.valueToCode(b, 'R', P.ORDER_NONE) || 0;
      return `robot.set_r(${r})\n`;
    };
    P['dobot_clear_alarm'] = () => 'robot.clear_alarm()\n';
    P['dobot_set_stepper_speed'] = (b) => {
      const port = b.getFieldValue('PORT');
      const speed = P.valueToCode(b, 'SPEED', P.ORDER_NONE) || 1000;
      return `robot.set_stepper_speed(${port}, ${speed})\n`;
    };
    P['dobot_set_stepper_pulses'] = (b) => {
      const port = b.getFieldValue('PORT');
      const speed = P.valueToCode(b, 'SPEED', P.ORDER_NONE) || 1000;
      const pulses = P.valueToCode(b, 'PULSES', P.ORDER_NONE) || 5000;
      return `robot.set_stepper_pulses(${port}, ${speed}, ${pulses})\n`;
    };
    P['dobot_lost_step_detect'] = () => 'robot.lost_step_detect()\n';
    P['dobot_set_lost_step_threshold'] = (b) => {
      const thresh = P.valueToCode(b, 'THRESHOLD', P.ORDER_NONE) || 3;
      return `robot.set_lost_step_threshold(${thresh})\n`;
    };

    // ── Dobot control/event generators ──────────────────────────────────
    P['dobot_when_started'] = (b) => {
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      return `def when_started():\n${body}\nwhen_started()\n`;
    };
    P['dobot_when_button'] = (b) => {
      const btn = b.getFieldValue('BUTTON');
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      return `def on_button_${btn.toLowerCase()}():\n${body}\nrobot.on_button('${btn}', on_button_${btn.toLowerCase()})\n`;
    };
    P['dobot_broadcast'] = (b) => {
      const msg = b.getFieldValue('MSG');
      return `robot.broadcast("${msg}")\n`;
    };
    P['dobot_broadcast_wait'] = (b) => {
      const msg = b.getFieldValue('MSG');
      return `robot.broadcast_and_wait("${msg}")\n`;
    };
    P['dobot_when_receive'] = (b) => {
      const msg = b.getFieldValue('MSG');
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      return `def on_${msg.replace(/\W/g, '_')}():\n${body}\nrobot.on_message("${msg}", on_${msg.replace(/\W/g, '_')})\n`;
    };
    P['dobot_wait_until'] = (b) => {
      const cond = P.valueToCode(b, 'COND', P.ORDER_NONE) || 'True';
      return `while not (${cond}):\n${P.INDENT}time.sleep(0.05)\n`;
    };
    P['dobot_stop'] = () => 'robot.emergency_stop()\nsys.exit()\n';
    P['dobot_timer_reset'] = () => '_timer_start = time.time()\n';
    P['dobot_timer_value'] = () => ['(time.time() - _timer_start)', P.ORDER_FUNCTION_CALL];

    // ── SmartBot (AI Starter) generators ────────────────────────────────
    P['smartbot_init'] = () => 'robot.smartbot_init()\n';
    P['smartbot_set_motor_speed'] = (b) => {
      const side = b.getFieldValue('SIDE');
      const speed = P.valueToCode(b, 'SPEED', P.ORDER_NONE) || 100;
      return `robot.set_motor_speed('${side}', ${speed})\n`;
    };
    P['smartbot_set_motor_pid'] = (b) => {
      const kp = P.valueToCode(b, 'KP', P.ORDER_NONE) || 1;
      const ki = P.valueToCode(b, 'KI', P.ORDER_NONE) || 0;
      return `robot.set_motor_pid(${kp}, ${ki})\n`;
    };
    P['smartbot_set_led'] = (b) => {
      const led = b.getFieldValue('LED');
      const state = b.getFieldValue('STATE');
      return `robot.set_led(${led}, '${state}')\n`;
    };
    P['smartbot_servo_attach'] = (b) => `robot.servo_attach(${b.getFieldValue('PORT')})\n`;
    P['smartbot_servo_set_angle'] = (b) => {
      const port = b.getFieldValue('PORT');
      const angle = P.valueToCode(b, 'ANGLE', P.ORDER_NONE) || 90;
      return `robot.servo_set_angle(${port}, ${angle})\n`;
    };
    P['smartbot_servo_detach'] = (b) => `robot.servo_detach(${b.getFieldValue('PORT')})\n`;
    P['smartbot_ultrasonic_start'] = (b) => `robot.ultrasonic_start('${b.getFieldValue('POSITION')}')\n`;
    P['smartbot_ultrasonic_detected'] = (b) => [`robot.ultrasonic_detected('${b.getFieldValue('POSITION')}')`, P.ORDER_FUNCTION_CALL];
    P['smartbot_ultrasonic_data'] = (b) => [`robot.ultrasonic_distance('${b.getFieldValue('POSITION')}')`, P.ORDER_FUNCTION_CALL];
    P['smartbot_ir_data'] = (b) => [`robot.ir_data(${b.getFieldValue('SENSOR')})`, P.ORDER_FUNCTION_CALL];
    P['smartbot_geomagnetic'] = () => ['robot.geomagnetic_angle()', P.ORDER_FUNCTION_CALL];
    P['smartbot_color_sensor_init'] = (b) => `robot.color_sensor_set('${b.getFieldValue('SIDE')}', '${b.getFieldValue('STATE')}')\n`;
    P['smartbot_color_sensor_data'] = (b) => [`robot.color_sensor_data('${b.getFieldValue('SIDE')}', '${b.getFieldValue('CHANNEL')}')`, P.ORDER_FUNCTION_CALL];
    P['smartbot_color_white_balance'] = (b) => `robot.color_white_balance('${b.getFieldValue('SIDE')}')\n`;
    P['smartbot_switch_status'] = (b) => [`robot.switch_status(${b.getFieldValue('SWITCH')})`, P.ORDER_FUNCTION_CALL];
    P['smartbot_motor_encoder'] = (b) => [`robot.motor_encoder('${b.getFieldValue('SIDE')}')`, P.ORDER_FUNCTION_CALL];
    P['smartbot_photoresistance'] = () => ['robot.photoresistance()', P.ORDER_FUNCTION_CALL];
    P['smartbot_ultrasonic_threshold'] = (b) => {
      const thresh = P.valueToCode(b, 'THRESHOLD', P.ORDER_NONE) || 50;
      return `robot.set_ultrasonic_threshold(${thresh})\n`;
    };
    P['smartbot_line_patrol_pid'] = (b) => {
      const kp = P.valueToCode(b, 'KP', P.ORDER_NONE) || 1;
      const ki = P.valueToCode(b, 'KI', P.ORDER_NONE) || 0;
      const kd = P.valueToCode(b, 'KD', P.ORDER_NONE) || 0;
      const el = P.valueToCode(b, 'ERROR_LIMIT', P.ORDER_NONE) || 100;
      return `robot.set_line_patrol_pid(${kp}, ${ki}, ${kd}, ${el})\n`;
    };
    P['smartbot_set_port_mode'] = (b) => {
      const port = P.valueToCode(b, 'PORT', P.ORDER_NONE) || 0;
      const mode = b.getFieldValue('MODE');
      return `robot.set_port_mode(${port}, '${mode}')\n`;
    };
    P['smartbot_digital_write'] = (b) => {
      const port = P.valueToCode(b, 'PORT', P.ORDER_NONE) || 0;
      const level = b.getFieldValue('LEVEL');
      return `robot.digital_write(${port}, '${level}')\n`;
    };
    P['smartbot_analog_write'] = (b) => {
      const port = P.valueToCode(b, 'PORT', P.ORDER_NONE) || 0;
      const duty = P.valueToCode(b, 'DUTY', P.ORDER_NONE) || 0;
      return `robot.analog_write(${port}, ${duty})\n`;
    };
    P['smartbot_digital_read'] = (b) => {
      const port = P.valueToCode(b, 'PORT', P.ORDER_NONE) || 0;
      return [`robot.digital_read(${port})`, P.ORDER_FUNCTION_CALL];
    };
    P['smartbot_analog_read'] = (b) => {
      const port = P.valueToCode(b, 'PORT', P.ORDER_NONE) || 0;
      return [`robot.analog_read(${port})`, P.ORDER_FUNCTION_CALL];
    };
    P['smartbot_set_servo_port'] = (b) => {
      const port = P.valueToCode(b, 'PORT', P.ORDER_NONE) || 0;
      const angle = P.valueToCode(b, 'ANGLE', P.ORDER_NONE) || 90;
      return `robot.set_servo(${port}, ${angle})\n`;
    };
    P['smartbot_tone'] = (b) => {
      const port = P.valueToCode(b, 'PORT', P.ORDER_NONE) || 0;
      const freq = P.valueToCode(b, 'FREQ', P.ORDER_NONE) || 440;
      const dur = P.valueToCode(b, 'DURATION', P.ORDER_NONE) || 500;
      return `robot.tone(${port}, ${freq}, ${dur})\n`;
    };
    P['smartbot_set_baud_rate'] = (b) => `robot.set_baud_rate(${b.getFieldValue('RATE')})\n`;
    P['smartbot_serial_print'] = (b) => {
      const txt = P.valueToCode(b, 'TEXT', P.ORDER_NONE) || '""';
      return `robot.serial_print(${txt})\n`;
    };
    P['smartbot_serial_println'] = (b) => {
      const txt = P.valueToCode(b, 'TEXT', P.ORDER_NONE) || '""';
      return `robot.serial_println(${txt})\n`;
    };
    P['smartbot_serial_read'] = () => ['robot.serial_read()', P.ORDER_FUNCTION_CALL];

    // ── AI Smart Kit generators ─────────────────────────────────────────
    P['smartkit_init'] = () => 'robot.smartkit_init()\n';
    P['smartkit_speech_init'] = () => 'robot.speech_init()\n';
    P['smartkit_speech_add_phrase'] = (b) => {
      const phrase = P.valueToCode(b, 'PHRASE', P.ORDER_NONE) || '""';
      const slot = b.getFieldValue('SLOT');
      return `robot.speech_add_phrase(${phrase}, ${slot})\n`;
    };
    P['smartkit_speech_detect'] = (b) => {
      const slot = b.getFieldValue('SLOT');
      return [`robot.speech_detect(${slot})`, P.ORDER_FUNCTION_CALL];
    };
    P['smartkit_joystick_button'] = (b) => [`robot.joystick_button('${b.getFieldValue('COLOR')}')`, P.ORDER_FUNCTION_CALL];
    P['smartkit_joystick_led'] = (b) => `robot.joystick_led('${b.getFieldValue('COLOR')}', '${b.getFieldValue('STATE')}')\n`;
    P['smartkit_joystick_value'] = (b) => [`robot.joystick_value('${b.getFieldValue('AXIS')}')`, P.ORDER_FUNCTION_CALL];
    P['smartkit_joystick_press'] = () => ['robot.joystick_press()', P.ORDER_FUNCTION_CALL];
    P['smartkit_get_digital'] = (b) => [`robot.get_digital_eio(${b.getFieldValue('PORT')})`, P.ORDER_FUNCTION_CALL];

    // ── VEX V5 generators ───────────────────────────────────────────────
    P['vex_drive_forward']  = (b) => {
      const dist = P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 12;
      const units = b.getFieldValue('UNITS');
      return `drivetrain.drive_for(FORWARD, ${dist}, ${units})\n`;
    };
    P['vex_drive_backward'] = (b) => {
      const dist = P.valueToCode(b, 'DISTANCE', P.ORDER_NONE) || 12;
      const units = b.getFieldValue('UNITS');
      return `drivetrain.drive_for(REVERSE, ${dist}, ${units})\n`;
    };
    P['vex_turn'] = (b) => {
      const dir = b.getFieldValue('DIRECTION');
      const deg = P.valueToCode(b, 'DEGREES', P.ORDER_NONE) || 90;
      return `drivetrain.turn_for(${dir}, ${deg}, DEGREES)\n`;
    };
    P['vex_drive_stop'] = (b) => {
      const mode = b.getFieldValue('MODE');
      return `drivetrain.stop(${mode})\n`;
    };
    P['vex_drive_speed'] = (b) => {
      const spd = P.valueToCode(b, 'SPEED', P.ORDER_NONE) || 50;
      return `drivetrain.set_drive_velocity(${spd}, PERCENT)\n`;
    };
    P['vex_motor_spin'] = (b) => {
      const port = b.getFieldValue('PORT');
      const dir = b.getFieldValue('DIRECTION');
      const spd = P.valueToCode(b, 'SPEED', P.ORDER_NONE) || 50;
      return `Motor(Ports.${port}).spin(${dir}, ${spd}, PERCENT)\n`;
    };
    P['vex_motor_stop'] = (b) => {
      const port = b.getFieldValue('PORT');
      const mode = b.getFieldValue('MODE');
      return `Motor(Ports.${port}).stop(${mode})\n`;
    };
    P['vex_motor_spin_for'] = (b) => {
      const port = b.getFieldValue('PORT');
      const dir = b.getFieldValue('DIRECTION');
      const amt = P.valueToCode(b, 'AMOUNT', P.ORDER_NONE) || 90;
      const units = b.getFieldValue('UNITS');
      return `Motor(Ports.${port}).spin_for(${dir}, ${amt}, ${units})\n`;
    };
    P['vex_sensor_distance'] = (b) => {
      const port = b.getFieldValue('PORT');
      return [`Distance(Ports.${port}).object_distance(MM)`, P.ORDER_FUNCTION_CALL];
    };
    P['vex_sensor_color'] = (b) => {
      const port = b.getFieldValue('PORT');
      return [`Color(Ports.${port}).color()`, P.ORDER_FUNCTION_CALL];
    };
    P['vex_sensor_bumper'] = (b) => {
      const port = b.getFieldValue('PORT');
      return [`Bumper(brain.three_wire_port.${port.toLowerCase()}).pressing()`, P.ORDER_FUNCTION_CALL];
    };
    P['vex_sensor_gyro'] = (b) => {
      const port = b.getFieldValue('PORT');
      return [`Inertial(Ports.${port}).heading()`, P.ORDER_FUNCTION_CALL];
    };
    P['vex_wait']  = (b) => {
      const ms = P.valueToCode(b, 'MSEC', P.ORDER_NONE) || 1000;
      return `wait(${ms}, MSEC)\n`;
    };
    P['vex_print'] = (b) => {
      const txt = P.valueToCode(b, 'TEXT', P.ORDER_NONE) || '""';
      return `brain.screen.print(${txt})\nbrain.screen.next_row()\n`;
    };
    P['vex_controller_button'] = (b) => {
      const btn = b.getFieldValue('BUTTON');
      return [`controller.${btn}.pressing()`, P.ORDER_FUNCTION_CALL];
    };
    P['vex_controller_axis'] = (b) => {
      const axis = b.getFieldValue('AXIS');
      return [`controller.${axis}.position()`, P.ORDER_FUNCTION_CALL];
    };

    // ── VEX V5 Screen generators ────────────────────────────────────────
    P['vex_screen_set_cursor'] = (b) => {
      const row = P.valueToCode(b, 'ROW', P.ORDER_NONE) || 1;
      const col = P.valueToCode(b, 'COL', P.ORDER_NONE) || 1;
      return `brain.screen.set_cursor(${row}, ${col})\n`;
    };
    P['vex_screen_next_row'] = () => 'brain.screen.next_row()\n';
    P['vex_screen_clear'] = () => 'brain.screen.clear_screen()\n';
    P['vex_screen_clear_row'] = (b) => {
      const row = P.valueToCode(b, 'ROW', P.ORDER_NONE) || 1;
      return `brain.screen.clear_row(${row})\n`;
    };
    P['vex_screen_set_font'] = (b) => {
      const font = b.getFieldValue('FONT');
      return `brain.screen.set_font(${font})\n`;
    };
    P['vex_screen_set_pen_color'] = (b) => {
      const color = b.getFieldValue('COLOR');
      return `brain.screen.set_pen_color(${color})\n`;
    };
    P['vex_screen_set_fill_color'] = (b) => {
      const color = b.getFieldValue('COLOR');
      return `brain.screen.set_fill_color(${color})\n`;
    };
    P['vex_screen_set_pen_width'] = (b) => {
      const w = P.valueToCode(b, 'WIDTH', P.ORDER_NONE) || 1;
      return `brain.screen.set_pen_width(${w})\n`;
    };
    P['vex_screen_draw_pixel'] = (b) => {
      const x = P.valueToCode(b, 'X', P.ORDER_NONE) || 0;
      const y = P.valueToCode(b, 'Y', P.ORDER_NONE) || 0;
      return `brain.screen.draw_pixel(${x}, ${y})\n`;
    };
    P['vex_screen_draw_line'] = (b) => {
      const x1 = P.valueToCode(b, 'X1', P.ORDER_NONE) || 0;
      const y1 = P.valueToCode(b, 'Y1', P.ORDER_NONE) || 0;
      const x2 = P.valueToCode(b, 'X2', P.ORDER_NONE) || 100;
      const y2 = P.valueToCode(b, 'Y2', P.ORDER_NONE) || 100;
      return `brain.screen.draw_line(${x1}, ${y1}, ${x2}, ${y2})\n`;
    };
    P['vex_screen_draw_rect'] = (b) => {
      const x = P.valueToCode(b, 'X', P.ORDER_NONE) || 0;
      const y = P.valueToCode(b, 'Y', P.ORDER_NONE) || 0;
      const w = P.valueToCode(b, 'W', P.ORDER_NONE) || 100;
      const h = P.valueToCode(b, 'H', P.ORDER_NONE) || 50;
      return `brain.screen.draw_rectangle(${x}, ${y}, ${w}, ${h})\n`;
    };
    P['vex_screen_draw_circle'] = (b) => {
      const x = P.valueToCode(b, 'X', P.ORDER_NONE) || 100;
      const y = P.valueToCode(b, 'Y', P.ORDER_NONE) || 100;
      const r = P.valueToCode(b, 'R', P.ORDER_NONE) || 50;
      return `brain.screen.draw_circle(${x}, ${y}, ${r})\n`;
    };
    P['vex_screen_pressing'] = () => ['brain.screen.pressing()', P.ORDER_FUNCTION_CALL];
    P['vex_screen_x_position'] = () => ['brain.screen.x_position()', P.ORDER_FUNCTION_CALL];
    P['vex_screen_y_position'] = () => ['brain.screen.y_position()', P.ORDER_FUNCTION_CALL];
    P['vex_screen_set_precision'] = (b) => {
      const digits = b.getFieldValue('DIGITS');
      return `brain.screen.set_print_precision(${digits})\n`;
    };

    // ── VEX V5 Sensing / Brain generators ───────────────────────────────
    P['vex_brain_battery'] = (b) => {
      const prop = b.getFieldValue('PROP');
      return [`brain.battery.${prop}()`, P.ORDER_FUNCTION_CALL];
    };
    P['vex_sensor_range_found'] = (b) => {
      const port = b.getFieldValue('PORT');
      return [`Sonar(brain.three_wire_port.${port.toLowerCase()}).found_object()`, P.ORDER_FUNCTION_CALL];
    };
    P['vex_sensor_range_distance'] = (b) => {
      const port = b.getFieldValue('PORT');
      const units = b.getFieldValue('UNITS');
      return [`Sonar(brain.three_wire_port.${port.toLowerCase()}).distance(${units})`, P.ORDER_FUNCTION_CALL];
    };

    // ── VEX V5 Console generators ───────────────────────────────────────
    P['vex_console_print'] = (b) => {
      const txt = P.valueToCode(b, 'TEXT', P.ORDER_NONE) || '""';
      return `print(${txt})\n`;
    };
    P['vex_console_clear'] = () => 'print("\\033c")\n';

    // ── VEX V5 Timer generators ─────────────────────────────────────────
    P['vex_timer_reset'] = () => 'brain.timer.reset()\n';
    P['vex_timer_value'] = (b) => {
      const units = b.getFieldValue('UNITS');
      return [`brain.timer.time(${units})`, P.ORDER_FUNCTION_CALL];
    };

    // ── VEX V5 Event generators ─────────────────────────────────────────
    P['vex_event_started'] = (b) => {
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      return `def when_started():\n${body}\nwhen_started()\n`;
    };
    P['vex_event_autonomous'] = (b) => {
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      return `def autonomous():\n${body}\n`;
    };
    P['vex_event_driver'] = (b) => {
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      return `def driver_control():\n${body}\n`;
    };
    P['vex_event_broadcast'] = (b) => {
      const msg = b.getFieldValue('MSG');
      return `broadcast("${msg}")\n`;
    };
    P['vex_event_broadcast_wait'] = (b) => {
      const msg = b.getFieldValue('MSG');
      return `broadcast_and_wait("${msg}")\n`;
    };
    P['vex_event_receive'] = (b) => {
      const msg = b.getFieldValue('MSG');
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      return `def on_${msg.replace(/\W/g, '_')}():\n${body}\n`;
    };
    P['vex_screen_event'] = (b) => {
      const action = b.getFieldValue('ACTION');
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      const fn = action === 'PRESSED' ? 'on_screen_pressed' : 'on_screen_released';
      return `def ${fn}():\n${body}\nbrain.screen.${action === 'PRESSED' ? 'pressed' : 'released'}(${fn})\n`;
    };
    P['vex_bumper_event'] = (b) => {
      const port = b.getFieldValue('PORT');
      const action = b.getFieldValue('ACTION');
      const body = P.statementToCode(b, 'DO') || P.INDENT + 'pass\n';
      const fn = `on_bumper_${port.toLowerCase()}_${action.toLowerCase()}`;
      return `def ${fn}():\n${body}\nBumper(brain.three_wire_port.${port.toLowerCase()}).${action === 'PRESSED' ? 'pressed' : 'released'}(${fn})\n`;
    };

    // ── VEX V5 Control extras generators ────────────────────────────────
    P['vex_wait_until'] = (b) => {
      const cond = P.valueToCode(b, 'COND', P.ORDER_NONE) || 'True';
      return `while not (${cond}):\n${P.INDENT}wait(5, MSEC)\n`;
    };
    P['vex_stop_project'] = () => 'sys.exit()\n';
    P['vex_comment'] = (b) => {
      const txt = b.getFieldValue('TEXT');
      return `# ${txt}\n`;
    };
  };

  /* ---- Toolbox XML (dynamic based on robot type) ---- */
  const getToolbox = (robotType) => {
    const contents = [];

    // ── VEX V5 robot — completely separate toolbox ──────────────────────
    if (robotType === 'vex_v5') {
      contents.push({
        kind: 'category', name: '🚗 Drivetrain', colour: COLORS.vex,
        contents: [
          { kind: 'block', type: 'vex_drive_forward',
            inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 12 } } } } },
          { kind: 'block', type: 'vex_drive_backward',
            inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 12 } } } } },
          { kind: 'block', type: 'vex_turn',
            inputs: { DEGREES: { block: { type: 'math_number', fields: { NUM: 90 } } } } },
          { kind: 'block', type: 'vex_drive_stop' },
          { kind: 'block', type: 'vex_drive_speed',
            inputs: { SPEED: { block: { type: 'math_number', fields: { NUM: 50 } } } } },
        ]
      });
      contents.push({
        kind: 'category', name: '⚙️ Motors', colour: COLORS.vex,
        contents: [
          { kind: 'block', type: 'vex_motor_spin',
            inputs: { SPEED: { block: { type: 'math_number', fields: { NUM: 50 } } } } },
          { kind: 'block', type: 'vex_motor_stop' },
          { kind: 'block', type: 'vex_motor_spin_for',
            inputs: { AMOUNT: { block: { type: 'math_number', fields: { NUM: 90 } } } } },
        ]
      });
      contents.push({
        kind: 'category', name: '📡 Sensors', colour: COLORS.sensor,
        contents: [
          { kind: 'block', type: 'vex_sensor_distance' },
          { kind: 'block', type: 'vex_sensor_color' },
          { kind: 'block', type: 'vex_sensor_bumper' },
          { kind: 'block', type: 'vex_sensor_gyro' },
          { kind: 'block', type: 'vex_sensor_range_found' },
          { kind: 'block', type: 'vex_sensor_range_distance' },
          { kind: 'block', type: 'vex_brain_battery' },
        ]
      });
      contents.push({
        kind: 'category', name: '🎮 Controller', colour: COLORS.vex,
        contents: [
          { kind: 'block', type: 'vex_controller_button' },
          { kind: 'block', type: 'vex_controller_axis' },
        ]
      });
      contents.push({
        kind: 'category', name: '🖥️ Screen', colour: COLORS.vexScreen,
        contents: [
          { kind: 'block', type: 'vex_print',
            inputs: { TEXT: { block: { type: 'text', fields: { TEXT: 'Hello VEX!' } } } } },
          { kind: 'block', type: 'vex_screen_set_cursor',
            inputs: {
              ROW: { block: { type: 'math_number', fields: { NUM: 1 } } },
              COL: { block: { type: 'math_number', fields: { NUM: 1 } } },
            } },
          { kind: 'block', type: 'vex_screen_next_row' },
          { kind: 'block', type: 'vex_screen_clear' },
          { kind: 'block', type: 'vex_screen_clear_row',
            inputs: { ROW: { block: { type: 'math_number', fields: { NUM: 1 } } } } },
          { kind: 'block', type: 'vex_screen_set_font' },
          { kind: 'block', type: 'vex_screen_set_precision' },
          { kind: 'block', type: 'vex_screen_set_pen_color' },
          { kind: 'block', type: 'vex_screen_set_fill_color' },
          { kind: 'block', type: 'vex_screen_set_pen_width',
            inputs: { WIDTH: { block: { type: 'math_number', fields: { NUM: 1 } } } } },
          { kind: 'block', type: 'vex_screen_draw_pixel',
            inputs: {
              X: { block: { type: 'math_number', fields: { NUM: 50 } } },
              Y: { block: { type: 'math_number', fields: { NUM: 50 } } },
            } },
          { kind: 'block', type: 'vex_screen_draw_line',
            inputs: {
              X1: { block: { type: 'math_number', fields: { NUM: 0 } } },
              Y1: { block: { type: 'math_number', fields: { NUM: 0 } } },
              X2: { block: { type: 'math_number', fields: { NUM: 100 } } },
              Y2: { block: { type: 'math_number', fields: { NUM: 100 } } },
            } },
          { kind: 'block', type: 'vex_screen_draw_rect',
            inputs: {
              X: { block: { type: 'math_number', fields: { NUM: 10 } } },
              Y: { block: { type: 'math_number', fields: { NUM: 10 } } },
              W: { block: { type: 'math_number', fields: { NUM: 100 } } },
              H: { block: { type: 'math_number', fields: { NUM: 50 } } },
            } },
          { kind: 'block', type: 'vex_screen_draw_circle',
            inputs: {
              X: { block: { type: 'math_number', fields: { NUM: 120 } } },
              Y: { block: { type: 'math_number', fields: { NUM: 60 } } },
              R: { block: { type: 'math_number', fields: { NUM: 40 } } },
            } },
          { kind: 'block', type: 'vex_screen_pressing' },
          { kind: 'block', type: 'vex_screen_x_position' },
          { kind: 'block', type: 'vex_screen_y_position' },
        ]
      });
      contents.push({
        kind: 'category', name: '📋 Console', colour: COLORS.io,
        contents: [
          { kind: 'block', type: 'vex_console_print',
            inputs: { TEXT: { block: { type: 'text', fields: { TEXT: 'Hello!' } } } } },
          { kind: 'block', type: 'vex_console_clear' },
        ]
      });
      contents.push({
        kind: 'category', name: '🟢 Events', colour: COLORS.vexEvents,
        contents: [
          { kind: 'block', type: 'vex_event_started' },
          { kind: 'block', type: 'vex_event_autonomous' },
          { kind: 'block', type: 'vex_event_driver' },
          { kind: 'block', type: 'vex_event_broadcast' },
          { kind: 'block', type: 'vex_event_broadcast_wait' },
          { kind: 'block', type: 'vex_event_receive' },
          { kind: 'block', type: 'vex_screen_event' },
          { kind: 'block', type: 'vex_bumper_event' },
        ]
      });
      // Standard Blockly categories still useful for VEX
      contents.push({ kind: 'sep' });
      contents.push({
        kind: 'category', name: '🔀 Logic', colour: '#5b80a5',
        contents: [
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'controls_ifelse' },
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'logic_operation' },
          { kind: 'block', type: 'logic_negate' },
          { kind: 'block', type: 'logic_boolean' },
        ]
      });
      contents.push({
        kind: 'category', name: '🔁 Control', colour: COLORS.control,
        contents: [
          { kind: 'block', type: 'vex_wait',
            inputs: { MSEC: { block: { type: 'math_number', fields: { NUM: 1000 } } } } },
          { kind: 'block', type: 'vex_wait_until' },
          { kind: 'block', type: 'controls_repeat_ext',
            inputs: { TIMES: { block: { type: 'math_number', fields: { NUM: 5 } } } } },
          { kind: 'block', type: 'controls_whileUntil' },
          { kind: 'block', type: 'controls_for' },
          { kind: 'block', type: 'vex_timer_reset' },
          { kind: 'block', type: 'vex_timer_value' },
          { kind: 'block', type: 'vex_stop_project' },
        ]
      });
      contents.push({
        kind: 'category', name: '🔢 Math', colour: COLORS.math,
        contents: [
          { kind: 'block', type: 'math_number' },
          { kind: 'block', type: 'math_arithmetic' },
          { kind: 'block', type: 'math_single' },
          { kind: 'block', type: 'math_round' },
          { kind: 'block', type: 'math_modulo' },
          { kind: 'block', type: 'math_random_int' },
        ]
      });
      contents.push({
        kind: 'category', name: '📝 Text', colour: '#64748b',
        contents: [
          { kind: 'block', type: 'text' },
          { kind: 'block', type: 'text_join' },
          { kind: 'block', type: 'text_length' },
          { kind: 'block', type: 'text_charAt' },
          { kind: 'block', type: 'text_indexOf' },
        ]
      });
      contents.push({ kind: 'category', name: '📦 Variables', colour: '#7c3aed', custom: 'VARIABLE' });
      contents.push({ kind: 'category', name: '🧩 Functions', colour: '#9333ea', custom: 'PROCEDURE' });
      contents.push({ kind: 'sep' });
      contents.push({
        kind: 'category', name: '💬 Comments', colour: '#94a3b8',
        contents: [
          { kind: 'block', type: 'vex_comment' },
        ]
      });
      return { kind: 'categoryToolbox', contents };
    }

    // ── Dobot / AI Starter toolbox ──────────────────────────────────────

    // ── Movement ──
    let movementBlocks;

    if (robotType === 'ai_starter') {
      // AI Starter (SmartBot) is a wheeled robot — drive/turn/motor blocks
      movementBlocks = [
        { kind: 'block', type: 'smartbot_init' },
        { kind: 'block', type: 'ai_starter_drive_forward',
          inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 100 } } } } },
        { kind: 'block', type: 'ai_starter_drive_backward',
          inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 100 } } } } },
        { kind: 'block', type: 'ai_starter_turn',
          inputs: { DEGREES: { block: { type: 'math_number', fields: { NUM: 90 } } } } },
        { kind: 'block', type: 'ai_starter_stop' },
        { kind: 'block', type: 'smartbot_set_motor_speed',
          inputs: { SPEED: { block: { type: 'math_number', fields: { NUM: 100 } } } } },
        { kind: 'block', type: 'smartbot_servo_attach' },
        { kind: 'block', type: 'smartbot_servo_set_angle',
          inputs: { ANGLE: { block: { type: 'math_number', fields: { NUM: 90 } } } } },
        { kind: 'block', type: 'smartbot_servo_detach' },
      ];
    } else {
      // Dobot Magician / Magician+AI — arm movement blocks
      movementBlocks = [
        { kind: 'block', type: 'dobot_move_home' },
        { kind: 'block', type: 'dobot_jump_to',
          inputs: {
            X: { block: { type: 'math_number', fields: { NUM: 200 } } },
            Y: { block: { type: 'math_number', fields: { NUM: 0 } } },
            Z: { block: { type: 'math_number', fields: { NUM: 0 } } },
            R: { block: { type: 'math_number', fields: { NUM: 0 } } },
          }
        },
        { kind: 'block', type: 'dobot_go_to',
          inputs: {
            X: { block: { type: 'math_number', fields: { NUM: 200 } } },
            Y: { block: { type: 'math_number', fields: { NUM: 0 } } },
            Z: { block: { type: 'math_number', fields: { NUM: 0 } } },
            R: { block: { type: 'math_number', fields: { NUM: 0 } } },
          }
        },
        { kind: 'block', type: 'dobot_move_to_point',
          inputs: {
            X: { block: { type: 'math_number', fields: { NUM: 0 } } },
            Y: { block: { type: 'math_number', fields: { NUM: 0 } } },
            Z: { block: { type: 'math_number', fields: { NUM: 0 } } },
          }
        },
        { kind: 'block', type: 'dobot_move_delta',
          inputs: {
            DX: { block: { type: 'math_number', fields: { NUM: 0 } } },
            DY: { block: { type: 'math_number', fields: { NUM: 0 } } },
            DZ: { block: { type: 'math_number', fields: { NUM: 0 } } },
          }
        },
        { kind: 'block', type: 'dobot_move_delta_r',
          inputs: { DR: { block: { type: 'math_number', fields: { NUM: 0 } } } } },
        { kind: 'block', type: 'dobot_set_r',
          inputs: { R: { block: { type: 'math_number', fields: { NUM: 0 } } } } },
        { kind: 'block', type: 'dobot_set_joint_angles',
          inputs: {
            J1: { block: { type: 'math_number', fields: { NUM: 0 } } },
            J2: { block: { type: 'math_number', fields: { NUM: 0 } } },
            J3: { block: { type: 'math_number', fields: { NUM: 0 } } },
            J4: { block: { type: 'math_number', fields: { NUM: 0 } } },
          }
        },
        { kind: 'block', type: 'dobot_rotate',
          inputs: { DEGREES: { block: { type: 'math_number', fields: { NUM: 45 } } } } },
        { kind: 'block', type: 'dobot_get_position' },
        { kind: 'block', type: 'dobot_get_joint_angles' },
        { kind: 'block', type: 'dobot_move_forward',
          inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'dobot_move_backward',
          inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'dobot_move_left',
          inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'dobot_move_right',
          inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'dobot_move_up',
          inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'dobot_move_down',
          inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 10 } } } } },
      ];
    }

    contents.push({
      kind: 'category', name: '🏠 Movement', colour: COLORS.movement,
      contents: movementBlocks,
    });

    // ── Gripper / End Effector (arm robots only) ──
    if (robotType !== 'ai_starter') {
      contents.push({
        kind: 'category', name: '✋ Gripper', colour: COLORS.gripper,
        contents: [
          { kind: 'block', type: 'dobot_set_end_effector' },
          { kind: 'block', type: 'dobot_grab' },
          { kind: 'block', type: 'dobot_release' },
          { kind: 'block', type: 'dobot_claw_open' },
          { kind: 'block', type: 'dobot_claw_close' },
        ]
      });
    }

    // ── Speed / Settings ──
    if (robotType === 'ai_starter') {
      contents.push({
        kind: 'category', name: '⚡ Speed', colour: COLORS.speed,
        contents: [
          { kind: 'block', type: 'dobot_set_speed' },
          { kind: 'block', type: 'smartbot_set_motor_pid',
            inputs: {
              KP: { block: { type: 'math_number', fields: { NUM: 1 } } },
              KI: { block: { type: 'math_number', fields: { NUM: 0 } } },
            } },
          { kind: 'block', type: 'smartbot_line_patrol_pid',
            inputs: {
              KP: { block: { type: 'math_number', fields: { NUM: 1 } } },
              KI: { block: { type: 'math_number', fields: { NUM: 0 } } },
              KD: { block: { type: 'math_number', fields: { NUM: 0 } } },
              ERROR_LIMIT: { block: { type: 'math_number', fields: { NUM: 100 } } },
            } },
        ]
      });
    } else {
      contents.push({
        kind: 'category', name: '⚡ Speed & Settings', colour: COLORS.speed,
        contents: [
          { kind: 'block', type: 'dobot_set_speed' },
          { kind: 'block', type: 'dobot_set_motion_ratio',
            inputs: {
              VELOCITY: { block: { type: 'math_number', fields: { NUM: 50 } } },
              ACCEL: { block: { type: 'math_number', fields: { NUM: 50 } } },
            } },
          { kind: 'block', type: 'dobot_set_joint_speed',
            inputs: {
              VELOCITY: { block: { type: 'math_number', fields: { NUM: 50 } } },
              ACCEL: { block: { type: 'math_number', fields: { NUM: 50 } } },
            } },
          { kind: 'block', type: 'dobot_set_xyz_speed',
            inputs: {
              VELOCITY: { block: { type: 'math_number', fields: { NUM: 100 } } },
              ACCEL: { block: { type: 'math_number', fields: { NUM: 100 } } },
            } },
          { kind: 'block', type: 'dobot_set_jump_height',
            inputs: {
              HEIGHT: { block: { type: 'math_number', fields: { NUM: 20 } } },
              ZLIMIT: { block: { type: 'math_number', fields: { NUM: 150 } } },
            } },
        ]
      });
    }

    // ── Actions / I/O ──
    if (robotType === 'ai_starter') {
      contents.push({
        kind: 'category', name: '⏱️ Actions & I/O', colour: COLORS.io,
        contents: [
          { kind: 'block', type: 'dobot_wait',
            inputs: { SECONDS: { block: { type: 'math_number', fields: { NUM: 1 } } } } },
          { kind: 'block', type: 'dobot_beep' },
          { kind: 'block', type: 'dobot_print',
            inputs: { TEXT: { block: { type: 'text', fields: { TEXT: 'Hello!' } } } } },
          { kind: 'block', type: 'smartbot_set_led' },
          { kind: 'block', type: 'dobot_emergency_stop' },
          { kind: 'block', type: 'smartbot_set_port_mode',
            inputs: { PORT: { block: { type: 'math_number', fields: { NUM: 2 } } } } },
          { kind: 'block', type: 'smartbot_digital_write',
            inputs: { PORT: { block: { type: 'math_number', fields: { NUM: 2 } } } } },
          { kind: 'block', type: 'smartbot_analog_write',
            inputs: {
              PORT: { block: { type: 'math_number', fields: { NUM: 3 } } },
              DUTY: { block: { type: 'math_number', fields: { NUM: 128 } } },
            } },
          { kind: 'block', type: 'smartbot_digital_read',
            inputs: { PORT: { block: { type: 'math_number', fields: { NUM: 2 } } } } },
          { kind: 'block', type: 'smartbot_analog_read',
            inputs: { PORT: { block: { type: 'math_number', fields: { NUM: 0 } } } } },
          { kind: 'block', type: 'smartbot_set_servo_port',
            inputs: {
              PORT: { block: { type: 'math_number', fields: { NUM: 9 } } },
              ANGLE: { block: { type: 'math_number', fields: { NUM: 90 } } },
            } },
          { kind: 'block', type: 'smartbot_tone',
            inputs: {
              PORT: { block: { type: 'math_number', fields: { NUM: 8 } } },
              FREQ: { block: { type: 'math_number', fields: { NUM: 440 } } },
              DURATION: { block: { type: 'math_number', fields: { NUM: 500 } } },
            } },
        ]
      });
    } else {
      contents.push({
        kind: 'category', name: '⏱️ Actions', colour: COLORS.io,
        contents: [
          { kind: 'block', type: 'dobot_wait',
            inputs: { SECONDS: { block: { type: 'math_number', fields: { NUM: 1 } } } } },
          { kind: 'block', type: 'dobot_beep' },
          { kind: 'block', type: 'dobot_print',
            inputs: { TEXT: { block: { type: 'text', fields: { TEXT: 'Hello!' } } } } },
          { kind: 'block', type: 'dobot_light_on' },
          { kind: 'block', type: 'dobot_emergency_stop' },
          { kind: 'block', type: 'dobot_clear_alarm' },
        ]
      });
    }

    // ── AI Features (only for ai_starter and magician_ai) ──
    if (robotType === 'ai_starter' || robotType === 'magician_ai') {
      contents.push({
        kind: 'category', name: '🤖 AI Features', colour: COLORS.ai,
        contents: [
          { kind: 'block', type: 'dobot_ai_detect_object' },
          { kind: 'block', type: 'dobot_ai_color_detect' },
          { kind: 'block', type: 'dobot_ai_face_detect' },
          { kind: 'block', type: 'dobot_ai_follow_line' },
          { kind: 'block', type: 'dobot_ai_grab_detected' },
        ]
      });
    }

    // ── AI Smart Kit (only for magician_ai) ──
    if (robotType === 'magician_ai') {
      contents.push({
        kind: 'category', name: '🧠 AI Smart Kit', colour: COLORS.ai,
        contents: [
          { kind: 'block', type: 'smartkit_init' },
          { kind: 'block', type: 'smartkit_speech_init' },
          { kind: 'block', type: 'smartkit_speech_add_phrase',
            inputs: { PHRASE: { block: { type: 'text', fields: { TEXT: 'hello' } } } } },
          { kind: 'block', type: 'smartkit_speech_detect' },
          { kind: 'block', type: 'smartkit_joystick_button' },
          { kind: 'block', type: 'smartkit_joystick_led' },
          { kind: 'block', type: 'smartkit_joystick_value' },
          { kind: 'block', type: 'smartkit_joystick_press' },
          { kind: 'block', type: 'smartkit_get_digital' },
        ]
      });
    }

    // ── Sensors ──
    if (robotType === 'ai_starter') {
      // SmartBot sensors
      contents.push({
        kind: 'category', name: '📡 Sensors', colour: COLORS.sensor,
        contents: [
          { kind: 'block', type: 'smartbot_ultrasonic_start' },
          { kind: 'block', type: 'smartbot_ultrasonic_detected' },
          { kind: 'block', type: 'smartbot_ultrasonic_data' },
          { kind: 'block', type: 'smartbot_ultrasonic_threshold',
            inputs: { THRESHOLD: { block: { type: 'math_number', fields: { NUM: 50 } } } } },
          { kind: 'block', type: 'smartbot_ir_data' },
          { kind: 'block', type: 'smartbot_geomagnetic' },
          { kind: 'block', type: 'smartbot_color_sensor_init' },
          { kind: 'block', type: 'smartbot_color_white_balance' },
          { kind: 'block', type: 'smartbot_color_sensor_data' },
          { kind: 'block', type: 'smartbot_switch_status' },
          { kind: 'block', type: 'smartbot_motor_encoder' },
          { kind: 'block', type: 'smartbot_photoresistance' },
        ]
      });
    } else {
      // Arm robot sensors
      contents.push({
        kind: 'category', name: '📡 Sensors', colour: COLORS.sensor,
        contents: [
          { kind: 'block', type: 'dobot_init_color_sensor' },
          { kind: 'block', type: 'dobot_init_infrared' },
          { kind: 'block', type: 'dobot_read_color_sensor' },
          { kind: 'block', type: 'dobot_read_infrared' },
          { kind: 'block', type: 'dobot_infrared_detected' },
          { kind: 'block', type: 'dobot_lost_step_detect' },
          { kind: 'block', type: 'dobot_set_lost_step_threshold',
            inputs: { THRESHOLD: { block: { type: 'math_number', fields: { NUM: 3 } } } } },
        ]
      });
    }

    // ── Conveyor Belt / Stepper (arm robots) ──
    if (robotType !== 'ai_starter') {
      contents.push({
        kind: 'category', name: '🏭 Conveyor & Stepper', colour: COLORS.conveyor,
        contents: [
          { kind: 'block', type: 'dobot_init_conveyor' },
          { kind: 'block', type: 'dobot_conveyor_speed',
            inputs: { SPEED: { block: { type: 'math_number', fields: { NUM: 50 } } } } },
          { kind: 'block', type: 'dobot_conveyor_stop' },
          { kind: 'block', type: 'dobot_conveyor_distance',
            inputs: { DISTANCE: { block: { type: 'math_number', fields: { NUM: 100 } } } } },
          { kind: 'block', type: 'dobot_set_stepper_speed',
            inputs: { SPEED: { block: { type: 'math_number', fields: { NUM: 1000 } } } } },
          { kind: 'block', type: 'dobot_set_stepper_pulses',
            inputs: {
              SPEED: { block: { type: 'math_number', fields: { NUM: 1000 } } },
              PULSES: { block: { type: 'math_number', fields: { NUM: 5000 } } },
            } },
        ]
      });
    }

    // ── Serial / Communication (SmartBot only) ──
    if (robotType === 'ai_starter') {
      contents.push({
        kind: 'category', name: '📡 Serial', colour: COLORS.io,
        contents: [
          { kind: 'block', type: 'smartbot_set_baud_rate' },
          { kind: 'block', type: 'smartbot_serial_println',
            inputs: { TEXT: { block: { type: 'text', fields: { TEXT: 'Hello!' } } } } },
          { kind: 'block', type: 'smartbot_serial_print',
            inputs: { TEXT: { block: { type: 'text', fields: { TEXT: 'data' } } } } },
          { kind: 'block', type: 'smartbot_serial_read' },
        ]
      });
    }

    // Separator
    contents.push({ kind: 'sep' });

    // ── Events ──
    contents.push({
      kind: 'category', name: '🟢 Events', colour: COLORS.control,
      contents: [
        { kind: 'block', type: 'dobot_when_started' },
        { kind: 'block', type: 'dobot_when_button' },
        { kind: 'block', type: 'dobot_broadcast' },
        { kind: 'block', type: 'dobot_broadcast_wait' },
        { kind: 'block', type: 'dobot_when_receive' },
      ]
    });

    // ── Logic (conditionals, comparisons, booleans) ──
    contents.push({
      kind: 'category', name: '🔀 Logic', colour: '#5b80a5',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'controls_ifelse' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
      ]
    });

    // ── Control (loops, wait, timer) ──
    contents.push({
      kind: 'category', name: '🔁 Control', colour: COLORS.control,
      contents: [
        { kind: 'block', type: 'dobot_wait',
          inputs: { SECONDS: { block: { type: 'math_number', fields: { NUM: 1 } } } } },
        { kind: 'block', type: 'dobot_wait_until' },
        { kind: 'block', type: 'controls_repeat_ext',
          inputs: { TIMES: { block: { type: 'math_number', fields: { NUM: 5 } } } } },
        { kind: 'block', type: 'controls_whileUntil' },
        { kind: 'block', type: 'controls_for' },
        { kind: 'block', type: 'controls_flow_statements' },
        { kind: 'block', type: 'dobot_timer_reset' },
        { kind: 'block', type: 'dobot_timer_value' },
        { kind: 'block', type: 'dobot_stop' },
      ]
    });

    // ── Math ──
    contents.push({
      kind: 'category', name: '🔢 Math', colour: COLORS.math,
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic' },
        { kind: 'block', type: 'math_single' },
        { kind: 'block', type: 'math_trig' },
        { kind: 'block', type: 'math_round' },
        { kind: 'block', type: 'math_modulo' },
        { kind: 'block', type: 'math_constrain',
          inputs: {
            LOW: { block: { type: 'math_number', fields: { NUM: 0 } } },
            HIGH: { block: { type: 'math_number', fields: { NUM: 200 } } },
          }
        },
        { kind: 'block', type: 'math_random_int' },
      ]
    });

    // ── Text ──
    contents.push({
      kind: 'category', name: '📝 Text', colour: '#64748b',
      contents: [
        { kind: 'block', type: 'text' },
        { kind: 'block', type: 'text_join' },
        { kind: 'block', type: 'text_length' },
        { kind: 'block', type: 'text_charAt' },
        { kind: 'block', type: 'text_indexOf' },
        { kind: 'block', type: 'text_print' },
      ]
    });

    // ── Variables ──
    contents.push({
      kind: 'category', name: '📦 Variables', colour: '#7c3aed',
      custom: 'VARIABLE',
    });

    // ── Lists ──
    contents.push({
      kind: 'category', name: '📋 Lists', colour: '#065f46',
      contents: [
        { kind: 'block', type: 'lists_create_empty' },
        { kind: 'block', type: 'lists_create_with' },
        { kind: 'block', type: 'lists_repeat',
          inputs: {
            NUM: { block: { type: 'math_number', fields: { NUM: 3 } } },
          } },
        { kind: 'block', type: 'lists_length' },
        { kind: 'block', type: 'lists_isEmpty' },
        { kind: 'block', type: 'lists_indexOf' },
        { kind: 'block', type: 'lists_getIndex' },
        { kind: 'block', type: 'lists_setIndex' },
      ]
    });

    // ── Functions (custom functions with inputs) ──
    contents.push({
      kind: 'category', name: '🧩 Functions', colour: '#9333ea',
      custom: 'PROCEDURE',
    });

    return { kind: 'categoryToolbox', contents };
  };

  let _currentRobotType = 'magician';

  /* ---- Initialize Blockly workspace ---- */
  const init = (containerId, robotType) => {
    _currentRobotType = robotType || 'magician';
    defineBlocks();
    defineGenerators();

    const toolbox = getToolbox(_currentRobotType);

    workspace = Blockly.inject(containerId, {
      toolbox: toolbox,
      grid: {
        spacing: 20,
        length: 3,
        colour: '#e2e8f0',
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
      trashcan: true,
      theme: {
        name: 'robotics',
        base: Blockly.Themes.Classic,
        fontStyle: { family: 'Inter, system-ui, sans-serif', size: 13 },
      },
    });

    // Add starter block on fresh workspace
    if (workspace.getAllBlocks(false).length === 0) {
      addStarterBlocks(_currentRobotType);
    }

    _currentRobotType = robotType || 'magician';

    return workspace;
  };

  /** Update the toolbox when robot type changes */
  const updateToolbox = (robotType) => {
    _currentRobotType = robotType || 'magician';
    if (!workspace) return;
    const toolbox = getToolbox(_currentRobotType);
    workspace.updateToolbox(toolbox);
  };

  const addStarterBlocks = (robotType) => {
    const rt = robotType || _currentRobotType || 'magician';
    const starterType = (rt === 'vex_v5') ? 'vex_drive_forward'
      : (rt === 'ai_starter') ? 'ai_starter_drive_forward'
      : 'dobot_move_home';
    const xml = Blockly.utils.xml.textToDom(`
      <xml>
        <block type="${starterType}" x="40" y="40"></block>
      </xml>
    `);
    Blockly.Xml.domToWorkspace(xml, workspace);
  };

  const getWorkspace  = () => workspace;

  const getPythonCode = () => {
    if (!workspace) return '';
    try {
      const code = Blockly.Python.workspaceToCode(workspace);
      if (_currentRobotType === 'vex_v5') {
        return [
          '# Auto-generated VEX V5 Python code from Blockly blocks',
          '# Run this file using VEXcode V5 or the VEX VS Code extension.',
          'from vex import *',
          '',
          '# --- VEX V5 device setup ---',
          '# Configure your motors and sensors below.',
          '# Adjust port numbers to match your physical wiring.',
          'brain      = Brain()',
          'controller = Controller()',
          '# Drivetrain: left motor on PORT1, right motor on PORT10',
          'left_motor  = Motor(Ports.PORT1,  GearSetting.RATIO18_1, False)',
          'right_motor = Motor(Ports.PORT10, GearSetting.RATIO18_1, True)',
          'drivetrain  = SmartDrive(left_motor, right_motor, Gyro(Ports.PORT2))',
          '',
          '# --- Your program ---',
          code,
        ].join('\n');
      }
      return `# Auto-generated Python code from Blockly blocks\nimport time\nimport sys\nfrom dobot_wrapper import DobotRobot\n\n# Change the port to match your robot's COM port (check Device Manager)\nrobot = DobotRobot(port='${localStorage.getItem('robot_port') || 'COM3'}')\n_timer_start = time.time()\n\n${code}`;
    } catch (e) {
      return `# Could not generate Python code: ${e.message}`;
    }
  };

  const getWorkspaceXml = () => {
    if (!workspace) return '';
    return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
  };

  const loadWorkspaceXml = (xmlText) => {
    if (!workspace || !xmlText) return;
    workspace.clear();
    const xml = Blockly.utils.xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, workspace);
  };

  return { init, updateToolbox, getWorkspace, getPythonCode, getWorkspaceXml, loadWorkspaceXml };
})();
