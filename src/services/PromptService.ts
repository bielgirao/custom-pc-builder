import inquirer from 'inquirer';

import { Cases, CPUs, Motherboards, RAMs, Storages, PSUs, GPUs } from "../data/componentsData";
import { DomainValidationService } from "./DomainValidationService";
import { ComponentFactory } from "../factories/ComponentFactory";
import { PCBuilder } from "../builders/PCBuilder";
import { Logger } from "./Logger";


export class PromptService {
  private builder = new PCBuilder();
  private customerName: string;

  async execute(): Promise<void> {
    await this.promptHeader();

    await this.promptCPU();
    await this.promptMotherboard();
    await this.promptRAM();
    await this.promptStorage();
    await this.promptCase();
    await this.promptPSU();
    await this.promptGPU();

    await this.verifyPowerSupply();
    await this.promptSpecs();
  }

  private async promptHeader() {
    Logger.heading("Welcome to the Custom PC Builder!");
    Logger.blank();
    Logger.body("This tool will help you build a custom PC by selecting compatible components.");
    Logger.body("Please follow the prompts to select your components.");
    Logger.blank();

    const answer = await inquirer.prompt<{ name: string }>([{
      type: "input",
      name: "name",
      message: "Please enter your name:",
      validate: (input) => input.trim() ? true : "Name cannot be empty."
    }]);
    this.customerName = answer.name;
  }

  private async promptCPU() {
    const answer = await inquirer.prompt<{ cpu: string }>([{
      type: "list",
      name: "cpu",
      message: "Choose your CPU:",
      choices: CPUs.map(c => ({
        name: `${c.name} (${c.socket} — ${c.cores} cores)`,
        value: c.name
      }))
    }]);

    const cpu = ComponentFactory.create("cpu", answer.cpu);
    this.builder.selectCPU(cpu);
  }

  private async promptMotherboard() {
    const cpu = this.builder.get!('cpu');

    const choices = Motherboards.map(mb => ({
      name: `${mb.name} (${mb.socket} — ${mb.formFactor} — ${mb.supportedRamType})`,
      value: mb.name,
      disabled: !DomainValidationService.isSocketCompatible(cpu, mb)
    }));

    choices.push(new inquirer.Separator())

    choices.push({
      name: "Choose a CPU with a different socket",
      value: "changeCPU"
    })

    const answer = await inquirer.prompt<{ mb: string }>([{
      type: "list",
      name: "mb",
      message: "Choose your Motherboard:",
      choices,
      loop: false,
      pageSize: choices.length,
    }]);

    if (answer.mb === "changeCPU") {
      await this.promptCPU();
      return this.promptMotherboard();
    } else {
      const mb = ComponentFactory.create("motherboard", answer.mb);
      this.builder.selectMotherboard(mb);
    }
  }

  private async promptRAM() {
    const mb = this.builder.get!('motherboard');

    const choices = RAMs.map(ram => ({
      name: `${ram.name} (${ram.type} — ${ram.capacity}GB @ ${ram.speedMHz}MHz)`,
      value: ram.name,
      disabled: !DomainValidationService.isRamCompatible(ram, mb)
    }))

    choices.push(new inquirer.Separator())

    choices.push({
      name: "Choose a Motherboard that supports a different RAM type.",
      value: "changeMB"
    })

    const answer = await inquirer.prompt<{ ram: string }>([{
      type: "list",
      name: "ram",
      message: "Choose your RAM:",
      choices,
      loop: false,
      pageSize: choices.length,
    }]);

    if (answer.mb === "changeMB") {
      await this.promptMotherboard();
      return this.promptRAM();
    } else {
      const ram = ComponentFactory.create("ram", answer.ram);
      this.builder.selectRAM(ram);
    }
  }

  private async promptStorage() {
    const answer = await inquirer.prompt<{ storage: string }>([{
      type: "list",
      name: "storage",
      message: "Choose your Storage:",
      choices: Storages.map(storage => ({
        name: `${storage.name} (${storage.interface}) ${storage.type} ${storage.capacity})`,
        value: storage.name
      })),
      loop: false,
      pageSize: Storages.length,
    }]);

    const storage = ComponentFactory.create('storage', answer.storage);
    this.builder.selectStorage(storage);
  }

  private async promptCase() {
    const mb = this.builder.get!('motherboard');

    const choices = Cases.map(pcCase => ({
      name: `${pcCase.name} (${pcCase.color} — ${pcCase.formFactorSupport.join(", ")})`,
      value: pcCase.name,
      disabled: !DomainValidationService.isMotherboardFormFactorCompatible(mb, pcCase)
    }));

    const answer = await inquirer.prompt<{ case: string }>([{
      type: "list",
      name: "case",
      message: "Choose your Case:",
      choices,
      loop: false,
      pageSize: choices.length,
    }]);

    const pcCase = ComponentFactory.create("case", answer.case);
    this.builder.selectCase(pcCase);
  }

  private async promptPSU(pwConsumption?: number) {
    const choices = PSUs.map(psu => ({
      name: `${psu.name} (${psu.powerSupply}W — ${psu.efficiencyRating * 100}% efficiency)`,
      value: psu.name,
      disabled: pwConsumption && (psu.powerSupply * psu.efficiencyRating) < pwConsumption
    }));

    const answer = await inquirer.prompt<{ psu: string }>([{
      type: "list",
      name: "psu",
      message: "Choose your Power Supply Unit (PSU):",
      choices,
      loop: false,
      pageSize: choices.length,
    }]);

    const psu = ComponentFactory.create("psu", answer.psu);
    this.builder.selectPSU(psu);
  }

  private async promptGPU() {
    const confirm = await inquirer.prompt<{ addGPU: boolean }>([{
      type: "confirm",
      name: "addGPU",
      message: "Would you like to add a dedicated GPU?",
      default: false
    }]);

    if(confirm.addGPU) {
      const answer = await inquirer.prompt<{ gpu: string }>([{
        type: "list",
        name: "gpu",
        message: "Choose your GPU:",
        choices: GPUs.map(gpu => ({
          name: `${gpu.name} (${gpu.memoryGB}GB @ ${gpu.clockMHz}MHz)`,
          value: gpu.name
        })),
        loop: false,
        pageSize: GPUs.length,
      }]);

      const gpu = ComponentFactory.create("gpu", answer.gpu);
      this.builder.selectGPU(gpu);
    }
  }

  private async verifyPowerSupply() {
    const pc = this.builder.build();

    if(!pc.isPowerSupplySufficient()) {
      const totalPowerSupply = pc.calculatePowerSupply();
      const totalPowerConsumption = pc.calculatePowerConsumption();

      const answer = await inquirer.prompt<{ changePSU: boolean }>([{
        type: "confirm",
        name: "changePSU",
        message: `Your selected PSU is sufficient for your build. It provides ${totalPowerSupply} of power, and your build will consume around ${totalPowerConsumption}. Would you like to change it?`,
        default: true
      }]);

      if(answer.changePSU) {
        return this.promptPSU(totalPowerConsumption);
      }
    }
  }

  private async promptSpecs() {
    const pc = this.builder.build();
    const components = pc.getComponents();

    Logger.blank();
    Logger.heading(`${this.customerName} here are your custom PC specs:`);

    Logger.blank();
    Logger.body(`CPU: ${components.cpu.name} (${components.cpu.socket} — ${components.cpu.cores} cores)`)
    Logger.body(`Motherboard: ${components.motherboard.name} (${components.motherboard.socket} — ${components.motherboard.formFactor} — ${components.motherboard.supportedRamType})`);
    Logger.body(`RAM: ${components.ram.name} (${components.ram.type} — ${components.ram.capacity}GB @ ${components.ram.speedMHz}MHz)`);
    Logger.body(`Storage: ${components.storage.name} (${components.storage.interface}) ${components.storage.type} ${components.storage.capacity})`);
    Logger.body(`Case: ${components.case.name} (${components.case.color} — ${components.case.formFactorSupport.join(", ")})`);
    Logger.body(`PSU: ${components.psu.name} (${components.psu.powerSupply}W — ${components.psu.efficiencyRating * 100}% efficiency)`);
    Logger.body(`GPU: ${components.gpu ? `${components.gpu.name} (${components.gpu.memoryGB}GB @ ${components.gpu.clockMHz}MHz)` : "No GPU selected"}`);

    Logger.blank();
    Logger.body(`Power supply: ${pc.getPowerSupply()} — Power consumption: ${pc.getPowerConsumption()}`);

    Logger.blank();
    Logger.heading(`Total price: ${pc.getTotalPrice()}`);

    Logger.blank();
    Logger.success("Thank you for using the Custom PC Builder!");
  }
}