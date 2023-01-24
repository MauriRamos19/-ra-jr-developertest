import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import calculateAmountPerMinute from '../utils/calculateAmountPerMinute'

const entryCase = async (req: Request, res: Response) => {
  const { plate_number } = req.body
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate_number,
      },
    })

    if (!vehicle) {
      const vehicle_added = await prisma.vehicle.create({
        data: { plate_number },
      })

      
      await prisma.inOutLogs.create({
        data: {
          vehicle: {
            connect: {
              id: vehicle_added.id
            }
          }
        },
      })

      return res.status(200).send({ ok: true, msg: 'Added vehicle' })
    }

    if (vehicle?.state !== 'inside') {
      await prisma.vehicle.update({
        where: {
          plate_number: vehicle.plate_number,
        },
        data: {
          state: 'inside',
        },
      })

      await prisma.inOutLogs.create({
        data: {
          vehicle: {
            connect: {
              id: vehicle.id,
            },
          },
        },
      })
      return res.status(200).send({ ok:true, msg: 'Updated vehicle state' })
    } else {
      return res.status(400).send({ok: false, msg: 'Vehice is already inside'})
    }
  } catch (error) {
    return res.status(400).send({ok: false, msg: 'Something went wrong' })
  }
}

const exitCase = async (req: Request, res: Response) => {
  const { plate_number } = req.body

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate_number,
      },
    })

    if (vehicle?.state === 'inside') {
      const [{ id }] = await prisma.inOutLogs.findMany({
        where: {
          vehiceId: vehicle?.id,
        },
        distinct: ['vehiceId'],
        orderBy: {
          entryTime: 'desc',
        },
        select: { id: true },
      })

      const log = await prisma.inOutLogs.update({
        where: {
          id,
        },
        data: {
          exitTime: new Date(Date.now()),
        },
      })

      if (vehicle?.type !== 'official') {
        const outDate = new Date(log.exitTime || 0)
        const inDate = new Date(log.entryTime)

        await prisma.vehicle.update({
          where: {
            plate_number: vehicle.plate_number,
          },
          data: {
            amountParking: {
              increment: calculateAmountPerMinute(inDate, outDate),
            },
            state: 'outside',
          },
        })

        return res.status(200).send({ ok: true, msg: 'Updated vehicle state' })
      }

      await prisma.vehicle.update({
        where: {
          plate_number: vehicle.plate_number,
        },
        data: {
          state: 'outside',
        },
      })
    } else {
      return res
        .status(400)
        .send({ ok: false, msg: 'Vehice is already outside' })
    } 
  } catch (error) {
    return res.status(400).send({ ok: false, msg: 'Something went wrong'})
  }
      
}

const getAllVehicles = async (req: Request, res: Response) => {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      type: 'official'
    },
    orderBy: {
      plate_number: 'asc'
    }
  })
  
  return res.status(200).send({ok: true,vehicles});
}

const addVehicle = async (req: Request, res: Response) => {
  const { plate_number } = req.body
  try {

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate_number
      }
    })

    if(vehicle) {

      if(vehicle.type === 'nonresidents') {
        await prisma.vehicle.update({
          where: {
            plate_number,
          },
          data: {
            type: 'official'
          }
        })

        return res.status(200).send({ ok: true, msg: 'Vehicle updated successfully' })
      }

      return res.status(400).send({ ok: false, msg: 'Vehicle already exits' })
    }
    
    await prisma.vehicle.create({
      data: {
        plate_number,
        type: 'official',
      },
    })

    return res.send({ ok: true, msg: 'Vehicle added successfully' })
  } catch (error) {
    return res.status(400).send({ ok:false, msg: error })
  }
}

const editVehicle = async (req: Request, res: Response) => {
  const { id } = req.params
  const { plate_number } = req.body
  try {
    await prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        plate_number,
      },
    })

    return res.send({ ok:true, msg: 'Vehicle updated successfully' })
  } catch (error) {
    return res.status(400).send({ ok: false, msg: error })
  }
}

const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await prisma.vehicle.delete({
      where: {
        id,
      },
    })

    return res.send({ok: true, msg: 'Vehicle deleted successfully' })
  } catch (error) {
    return res.status(400).send({ ok: false, msg: 'Error' })
  }
}


const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.inOutLogs.findMany({
      select: {
        vehicle: {
          select: {
            plate_number: true
          }
        },
        entryTime: true,
        exitTime: true
      }
    })

    return res.send({logs})
  } catch (error) {
    return res.status(400).send({ msg: error })
  }
}


const getVehicle = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id
      }
    })

    return res.send({ vehicle: vehicle?.plate_number })
  } catch (error) {
    return res.status(400).send({ msg: error })
  }
}

export default {
  getAllVehicles,
  addVehicle,
  editVehicle,
  deleteVehicle,
  entryCase,
  exitCase,
  getLogs,
  getVehicle,
}
